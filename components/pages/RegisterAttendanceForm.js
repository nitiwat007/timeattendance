//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import AttendeesApi from '../../apis/attendees'
import AttendanceApi from '../../apis/attendance'
import StudentApi from '../../apis/student'

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
            ScheduleTitle: this.props.ScheduleTitle
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
                alert('Submited')
                Actions.registattendancelist({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })
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
                alert('Submited')
                Actions.registattendancelist({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })
            }).catch(error => {
                alert(error.response.data.Message)
            })
        } else {
            alert('Please enter Code and Fullname.')
        }
    }

    onSearch = () => {
        Keyboard.dismiss()
        const { code } = this.state
        if (code !== '') {
            StudentApi.getStudentInfo(code).then(data => this.setState({ fullname: data.FirstNameTH + ' ' + data.LastNameTH })).catch(error => {
                alert(error.response.data)
            })
        } else {
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
        const { code, attendeeID, fullname, email, phonenumber, note } = this.state
        return (
            <Container style={styles.container}>
                <AppHeaderHome title={ScheduleTitle} />
                <Content>
                    <Form style={styles.form}>
                        <Label>Code</Label>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Item regular style={styles.formItemCode}>
                                <Input style={styles.inputText} value={code} onChangeText={(code) => this.setState({ code })} />

                            </Item>
                            <Button full info style={{ flex: 1, height: 52 }} onPress={this.onSearch}>
                                <Text>Passport</Text>
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
                        <Button block success style={styles.buttonSubmit} onPress={this.onCheckIn}>
                            <Text style={styles.textButtonSubmit}>CHECK IN</Text>
                        </Button>
                        <Button block danger style={styles.buttonSubmit} onPress={this.onCheckOut}>
                            <Text style={styles.textButtonSubmit}>CHECK OUT</Text>
                        </Button>
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
                            <Text>QR Code</Text>
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
        margin: 10,
        marginTop: 30
    },
    textButtonSubmit: {
        color: '#FFFFFF'
    },
    inputTextMulltiline: {
        backgroundColor: '#FFFFFF',
        height: 80
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendanceForm);
