//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, ActivityIndicator, Modal } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button, Alert, Card, CardItem, Left, Right, Body, Header, Title, List, ListItem } from 'native-base'
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
            EventID: this.props.scheduleSelect.EventID,
            ScheduleID: this.props.scheduleSelect.ScheduleID,
            ScheduleTitle: this.props.scheduleSelect.ScheduleTitle,
            isLoading: false,
            isLoadingCheckIn: false,
            isLoadingCheckOut: false,
            disabledButtonPassport: false,
            disabledButtonCheckIn: false,
            disabledButtonCheckOut: false,
            modalVisible: false,
            modalFullnameVisible: false,
            checkInDateTime: '',
            checkOutDateTime: '',
            action: '',
            SearchFullnameData: [],
            SearchFullnameSelect: {}
        }
    }

    onCheckIn = () => {
        this.setState({
            isLoadingCheckIn: true,
            disabledButtonCheckIn: true
        })
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
                    checkInDateTime: dateNow,
                    action: 'checkin',
                    isLoadingCheckIn: false,
                    disabledButtonCheckIn: false
                })
                //Actions.registattendancelist({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })
            }).catch(error => {
                this.setState({
                    isLoadingCheckIn: false,
                    disabledButtonCheckIn: false
                })
                alert(error.response.data.Message)
            })
        } else {
            this.setState({
                isLoadingCheckIn: false,
                disabledButtonCheckIn: false
            })
            alert('Please enter Code and Fullname.')
        }
    }

    onCheckOut = () => {
        this.setState({
            isLoadingCheckOut: true,
            disabledButtonCheckOut: true
        })
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
                    checkOutDateTime: dateNow,
                    action: 'checkout',
                    isLoadingCheckOut: false,
                    disabledButtonCheckOut: false
                })
            }).catch(error => {
                this.setState({
                    isLoadingCheckOut: false,
                    disabledButtonCheckOut: false
                })
                alert(error.response.data.Message)
            })
        } else {
            this.setState({
                isLoadingCheckOut: false,
                disabledButtonCheckOut: false
            })
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

        this.setState({
            modalVisible: false,
            code: '',
            fullname: '',
            email: '',
            phonenumber: '',
            note: ''
        })
        Actions.reset('registattendance')
    }

    closeModalList = () => {

        this.setState({
            modalVisible: false,
            code: '',
            fullname: '',
            email: '',
            phonenumber: '',
            note: ''
        })
        Actions.reset('registattendancelist')
    }

    searchFullnameTextChange = (searchFullname) => {

        EmployeeApi.getEmployeeByName(searchFullname).then(data => {
            this.setState({
                SearchFullnameData: data.result.slice(0, 10),
                isLoading: false
            })
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    SearchFullnameData: [],
                    isLoading: false
                })
            }

        })
    }

    onSearchFullnameSelect = (account_name, fullname) => [
        this.setState({
            modalFullnameVisible: false,
            SearchFullnameData: [],
            code: account_name,
            fullname: fullname
        })
    ]

    onSearchFullname = () => {
        this.setState({
            modalFullnameVisible: true
        })
    }

    onCloseFullname = () => {
        this.setState({
            modalFullnameVisible: false,
            SearchFullnameData: []
        })
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
        const { scheduleSelect } = this.props
        const { memberID, code, attendeeID, fullname, email, phonenumber, note, disabledButtonPassport, disabledButtonCheckIn, disabledButtonCheckOut, checkInDateTime, checkOutDateTime, action, SearchFullnameData } = this.state
        return (
            <Container style={styles.container}>
                <AppHeaderHome title={scheduleSelect.ScheduleTitle} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalFullnameVisible}
                    onShow={() => { this.textInput._root.focus() }}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Header style={styles.headerModal}>
                        <Left>
                            <Button transparent large onPress={this.onCloseFullname}>
                                <Icon name='md-close' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ fontWeight: 'bold' }}>Search</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>
                    <Content>
                        <View style={styles.formItemSearchFullname}>
                            <Input ref={(input) => { this.textInput = input }} style={styles.inputTextSearchFullname} placeholder='Enter name (PSU Phuket Staff only)' onChangeText={(searchFullname) => this.searchFullnameTextChange(searchFullname)} />
                        </View>
                        <View>
                            {this.state.isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                            <List style={styles.listSearchFullname}>
                                {SearchFullnameData.map((data, i) =>
                                    <ListItem key={i} button onPress={() => this.onSearchFullnameSelect(data.account_name, data.fullname)}>
                                        <Left style={{ flex: 4 }}>
                                            <Text>{data.fullname}</Text>
                                        </Left>
                                        <Body>

                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                )}
                            </List>
                        </View>
                    </Content>
                </Modal>
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
                                typelistbox='showresult'
                            />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button style={{ marginTop: 10 }} full success onPress={this.closeModalScan}>
                                        <Icon name="md-qr-scanner" />
                                        <Text style={styles.textButtonSubmit}>SCAN</Text>
                                    </Button>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button style={{ marginTop: 10 }} full primary onPress={this.closeModalList}>
                                        <Icon name="md-people" />
                                        <Text style={styles.textButtonSubmit}>LIST</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab style={{ backgroundColor: "#FFF" }}>
                            <Button full warning onPress={this.closeModal}>
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>CLOSE</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
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
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Item regular style={styles.formItemFullname}>
                                <Input style={styles.inputText} value={fullname} onChangeText={(fullname) => this.setState({ fullname })} />
                            </Item>
                            <Button disabled={disabledButtonPassport} full info style={{ flex: 1, height: 52 }} onPress={this.onSearchFullname}>
                                {(this.state.isLoading) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text><Icon iconLeft style={{ color: '#FFFFFF', fontSize: 18 }} name='md-search' /></Text>}
                            </Button>
                        </View>
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
                                <Button disabled={disabledButtonCheckIn} full success onPress={this.onCheckIn}>
                                    <Icon name="ios-checkmark-circle-outline" />
                                    {(this.state.isLoadingCheckIn) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text style={styles.textButtonSubmit}>CHECK IN</Text>}
                                </Button>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button disabled={disabledButtonCheckOut} full danger onPress={this.onCheckOut}>
                                    <Icon name="md-checkmark-circle" />
                                    {(this.state.isLoadingCheckOut) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text style={styles.textButtonSubmit}>CHECK OUT</Text>}
                                </Button>
                            </View>
                        </View>

                    </Form>
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button vertical full active onPress={() => Actions.reset('registattendanceform')}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical full onPress={() => Actions.reset('registattendance')}>
                            <Icon name="md-qr-scanner" />
                            <Text>Scan</Text>
                        </Button>
                        <Button vertical full onPress={() => Actions.reset('registattendancelist')}>
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
    formItemFullname: {
        marginBottom: 15,
        flex: 4
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
    formItemSearchFullname: {
        padding: 10
    },
    listSearchFullname: {
        paddingRight: 10
    },
    inputTextSearchFullname: {
        borderColor: '#E6E6E6',
        borderWidth: 1,
        borderRadius: 0,
        backgroundColor: '#FAFAFA'
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
    },
    headerModalSearchFullname: {

    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail,
        scheduleSelect: state.scheduleSelect
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendanceForm);
