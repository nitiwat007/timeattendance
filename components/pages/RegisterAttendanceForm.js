//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, ActivityIndicator, Modal } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button, Alert, Card, CardItem, Left, Right, Body } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import AttendeesApi from '../../apis/attendees'
import AttendanceApi from '../../apis/attendance'
import StudentApi from '../../apis/student'
import EmployeeApi from '../../apis/employee'
import ListBox from '../ListBox'

// create a component
class RegisterAttendanceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            memberID: this.props.userDetail[0],
            code: this.props.ID,
            attendeeID: '',
            fullname: '',
            email: '',
            phonenumber: '',
            note: '',
            EventID: this.props.EventID,
            ScheduleID: this.props.ScheduleID,
            ScheduleTitle: this.props.ScheduleTitle,
            isLoading: false,
            disabledButtonPassport: false,
            modalVisible: false,
            checkInDateTime: '',
            checkOutDateTime: '',
            action: ''
        }
    }

    onCheckIn = () => {
        const { memberID, code, attendeeID, fullname, email, phonenumber, note } = this.state
        const { ScheduleID, EventID, ScheduleTitle } = this.state

        if (fullname !== '' && code !== '') {
            const data = {
                'Code': code,
                'Fullname': fullname,
                'Email': email,
                'PhoneNumber': phonenumber,
                'Note': note
            }
            AttendanceApi.checkIn(memberID, EventID, ScheduleID, data).then(data => {
                const dateNow = new Date()
                this.setState({
                    modalVisible: true,
                    checkInDateTime: dateNow.getDate() + "-" + parseInt(dateNow.getMonth() + 1) + "-" + dateNow.getFullYear() + " Time " + dateNow.getHours() + ":" + (dateNow.getMinutes() < 10 ? '0' : '') + dateNow.getMinutes() + ":" + (dateNow.getSeconds() < 10 ? '0' : '') + dateNow.getSeconds(),
                    action: 'checkin'
                })
                //Actions.registattendancelist({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })
            }).catch(error => {
                alert(error.response.data.Message)
            })
        } else {
            alert('Please enter Code and Fullname.')
        }
    }

    onCheckOut = () => {

        const { memberID, code, attendeeID, fullname, email, phonenumber, note } = this.state
        const { ScheduleID, EventID, ScheduleTitle } = this.state

        if (fullname !== '' && code !== '') {
            const data = {
                'Code': code,
                'Fullname': fullname,
                'Email': email,
                'PhoneNumber': phonenumber,
                'Note': note
            }
            AttendanceApi.checkOut(memberID, EventID, ScheduleID, data).then(data => {
                const dateNow = new Date()
                this.setState({
                    modalVisible: true,
                    checkOutDateTime: dateNow.getDate() + "-" + parseInt(dateNow.getMonth() + 1) + "-" + dateNow.getFullYear() + " Time " + dateNow.getHours() + ":" + (dateNow.getMinutes() < 10 ? '0' : '') + dateNow.getMinutes() + ":" + (dateNow.getSeconds() < 10 ? '0' : '') + dateNow.getSeconds(),
                    action: 'checkout'
                })
                //Actions.registattendancelist({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })
            }).catch(error => {
                alert(error.response.data.Message)
            })
        } else {
            alert('Please enter Code and Fullname.')
        }
    }

    closeModal = () => {
        this.setState({
            modalVisible: false,
            code: '',
            fullname: '',
            email: '',
            phonenumber: '',
            note: ''
        })
    }

    closeModalScan = () => {
        const { ScheduleID, EventID, ScheduleTitle } = this.props
        this.setState({
            modalVisible: false,
            code: '',
            fullname: '',
            email: '',
            phonenumber: '',
            note: ''
        })
        Actions.reset('registattendance', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })
    }

    onSearch = () => {
        this.setState({
            isLoading: true,
            disabledButtonPassport: true
        })
        Keyboard.dismiss()
        const { code } = this.state
        if (code !== '') {
            StudentApi.getStudentInfo(code).then(data => {
                this.setState({
                    fullname: data.FirstNameTH + ' ' + data.LastNameTH,
                    isLoading: false,
                    disabledButtonPassport: false
                })
            }).catch(error => {
                if (error.response.status = 404) {
                    EmployeeApi.getEmployeeInfo(code).then(data => {
                        this.setState({
                            fullname: data.FirstNameTH + ' ' + data.LastNameTH,
                            isLoading: false,
                            disabledButtonPassport: false
                        })
                    }).catch(error => {
                        this.setState({
                            isLoading: false,
                            disabledButtonPassport: false,
                            fullname: ''
                        })
                        if (error.response.status = 404) {
                            alert('Not found.')
                        } else {
                            alert(error.response.data)
                        }
                    })
                } else {
                    alert(error.response.data)
                }
            })
        } else {
            this.setState({
                isLoading: false,
                disabledButtonPassport: false
            })
            alert('Please enter Code.')
        }
    }

    componentDidMount() {
        const { memberID, ScheduleID, EventID, ScheduleTitle } = this.state
        if (this.state.code === undefined) {
            this.setState({
                code: ''
            })
        } else {
            AttendeesApi.getAttendeesByID(memberID, EventID, this.state.code).then(data => {
                this.setState({
                    attendeeID: data[0].ID,
                    fullname: data[0].FullName,
                    email: data[0].Email,
                    phonenumber: data[0].PhoneNumber,
                    note: data[0].Note
                })
            }).catch(error => {
                if (error.response.status = 404) {
                    //alert('Information not found')
                } else {
                    alert(error.response.status)
                }
            })
        }
    }

    render() {
        const { ScheduleID, EventID, ScheduleTitle } = this.props
        const { memberID, code, attendeeID, fullname, email, phonenumber, note, disabledButtonPassport, checkInDateTime, checkOutDateTime, action } = this.state
        return (
            <Container style={styles.container}>
                <AppHeaderHome title={ScheduleTitle} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Content style={styles.contentModal}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {(action === 'checkin') ? <Text style={styles.modalTitle}>CHECKED IN</Text> : <Text style={styles.modalTitle}>CHECKED OUT</Text>}
                        </View>
                        <View>
                            <ListBox
                                fullname={fullname}
                                checkindatetime={checkInDateTime}
                                checkinby={memberID}
                                checkoutdatetime={checkOutDateTime}
                                checkoutby={memberID}
                                action={action}
                            />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button style={{ marginTop: 10 }} full success onPress={this.closeModalScan}>
                                        <Icon name="md-qr-scanner" />
                                        <Text style={styles.textButtonSubmit}>SCAN</Text>
                                    </Button>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button style={{ marginTop: 10 }} full primary onPress={this.closeModal}>
                                        <Icon name="md-close" />
                                        <Text style={styles.textButtonSubmit}>CLOSE</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>

                    </Content>
                </Modal>
                <Content>
                    <Form style={styles.form}>
                        <Label>Code</Label>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Item regular style={styles.formItemCode}>
                                <Input style={styles.inputText} value={code} onChangeText={(code) => this.setState({ code })} />

                            </Item>
                            <Button disabled={disabledButtonPassport} full info style={{ flex: 1, height: 52 }} onPress={this.onSearch}>
                                {(this.state.isLoading) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text>Passport</Text>}
                            </Button>
                        </View>
                        <Label>Fullname</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} value={fullname} onChangeText={(fullname) => this.setState({ fullname })} />
                        </Item>
                        <Label>Email</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} value={email} onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Label>Phone Number</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} value={phonenumber} onChangeText={(phonenumber) => this.setState({ phonenumber })} />
                        </Item>
                        <Label>Note</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputTextMulltiline} multiline={true} value={note} onChangeText={(note) => this.setState({ note })} />
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button full success onPress={this.onCheckIn}>
                                    <Icon name="ios-checkmark-circle-outline" />
                                    <Text style={styles.textButtonSubmit}>CHECK IN</Text>
                                </Button>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button full danger onPress={this.onCheckOut}>
                                    <Icon name="md-checkmark-circle" />
                                    <Text style={styles.textButtonSubmit}>CHECK OUT</Text>
                                </Button>
                            </View>
                        </View>

                    </Form>
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button vertical active onPress={() => Actions.reset('registattendanceform', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.reset('registattendance', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-qr-scanner" />
                            <Text>Scan</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.reset('registattendancelist', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-people" />
                            <Text>List</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        padding: 10
    },
    formItem: {
        marginBottom: 15,
    },
    formItemCode: {
        marginBottom: 15,
        flex: 2
    },
    inputText: {
        backgroundColor: '#FFFFFF'
    },
    buttonSubmit: {

    },
    textButtonSubmit: {
        color: '#FFFFFF'
    },
    inputTextMulltiline: {
        backgroundColor: '#FFFFFF',
        height: 80
    },
    textLabelCheckIn: {
        color: 'green'
    },
    textLabelCheckOut: {
        color: 'red'
    },
    textLabelCheckBy: {
        color: '#2E86C1'
    },
    cardAttendance: {
        marginBottom: 10
    },
    cardItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    cardItemFullname: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        backgroundColor: '#FAFAFA'
    },
    contentModal: {
        flex: 1,
        padding: 10,
        marginTop: 50
    },
    modalTitle: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: '#424242'
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendanceForm);
