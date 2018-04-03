//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Thumbnail } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import DatePicker from 'react-native-datepicker'
import ScheduleApi from '../../apis/schedule'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// create a component
class NewSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            memberID: this.props.userDetail[0],
            ScheduleTitle: '',
            ScheduleFromDate: '',
            ScheduleToDate: '',
            ScheduleFromTime: '00:00',
            ScheduleToTime: '00:00',
            ScheduleNote: '',
            EventID: this.props.EventID,
            AllowSelfTimeStamp: false,
            IsAvailable: true,
            isLoading: false,
            disabledButtonSave: false,
            AvailableForAttendanceFromDate: '',
            AvailableForAttendanceToDate: '',
            AvailableForAttendanceFromTime: '00:00',
            AvailableForAttendanceToTime: '00:00'
        }
    }

    onSubmit = () => {
        this.setState({
            isLoading: true,
            disabledButtonSave: true
        })
        const { memberID, ScheduleTitle, ScheduleFromDate, ScheduleToDate, ScheduleFromTime, ScheduleToTime,
            ScheduleNote, EventID, AllowSelfTimeStamp, AvailableForAttendanceFromDate, AvailableForAttendanceToDate,
            AvailableForAttendanceFromTime, AvailableForAttendanceToTime } = this.state
        const ScheduleFrom = ScheduleFromDate + 'T' + ScheduleFromTime
        const ScheduleTo = ScheduleToDate + 'T' + ScheduleToTime
        const AvailableForAttendanceFrom = AvailableForAttendanceFromDate + 'T' + AvailableForAttendanceFromTime
        const AvailableForAttendanceTo = AvailableForAttendanceToDate + 'T' + AvailableForAttendanceToTime
        const data = {
            EventID: EventID,
            ScheduleTitle: ScheduleTitle,
            ScheduleFrom: ScheduleFrom,
            ScheduleTo: ScheduleTo,
            AvailableForAttendanceFrom: AvailableForAttendanceFrom,
            AvailableForAttendanceTo: AvailableForAttendanceTo,
            ScheduleNote: ScheduleNote,
            //AllowSelfTimeStamp: AllowSelfTimeStamp,
            IsAvailable: true
        }
        ScheduleApi.createSchedule(memberID, EventID, data).then(data => {
            this.setState({
                isLoading: false,
                disabledButtonSave: false
            })
            alert('Create schedule success')
            Actions.main()
        }).catch(error => {
            this.setState({
                isLoading: false,
                disabledButtonSave: false
            })
            alert(error.response.data.Message)
        })
    }

    render() {
        const { ScheduleTitle, ScheduleFromDate, ScheduleToDate, ScheduleFromTime, ScheduleToTime, ScheduleNote, EventID, AllowSelfTimeStamp,
            AvailableForAttendanceFromDate, AvailableForAttendanceToDate,
            AvailableForAttendanceFromTime, AvailableForAttendanceToTime } = this.state
        return (
            <Container style={styles.container}>
                <AppHeaderBack title='New Schedule' />
                <Content>
                    <Form style={styles.form}>
                        <Label>Title</Label>
                        <Item regular style={styles.formItem} >
                            <Input ref={(c) => this.inputTitle} style={styles.inputText} onChangeText={(ScheduleTitle) => this.setState({ ScheduleTitle })} />
                        </Item>
                        <Label>From</Label>
                        <View style={styles.formItem}>
                            <DatePicker
                                style={styles.datePicker}
                                date={ScheduleFromDate}
                                mode='date'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Date"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(ScheduleFromDate) => { this.setState({ ScheduleFromDate }) }}
                            />
                            <DatePicker
                                style={styles.datePicker}
                                date={ScheduleFromTime}
                                mode='time'
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Time"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(ScheduleFromTime) => { this.setState({ ScheduleFromTime }) }}
                            />
                        </View>
                        <Label>To</Label>
                        <View style={styles.formItem}>
                            <DatePicker
                                style={styles.datePicker}
                                date={ScheduleToDate}
                                mode='date'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Date"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(ScheduleToDate) => { this.setState({ ScheduleToDate }) }}
                            />
                            <DatePicker
                                style={styles.datePicker}
                                date={ScheduleToTime}
                                mode='time'
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Time"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(ScheduleToTime) => { this.setState({ ScheduleToTime }) }}
                            />
                        </View>
                        <Label>Available Attendance From</Label>
                        <View style={styles.formItem}>
                            <DatePicker
                                style={styles.datePicker}
                                date={AvailableForAttendanceFromDate}
                                mode='date'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Date"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(AvailableForAttendanceFromDate) => { this.setState({ AvailableForAttendanceFromDate }) }}
                            />
                            <DatePicker
                                style={styles.datePicker}
                                date={AvailableForAttendanceFromTime}
                                mode='time'
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Time"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(AvailableForAttendanceFromTime) => { this.setState({ AvailableForAttendanceFromTime }) }}
                            />
                        </View>
                        <Label>Available Attendance To</Label>
                        <View style={styles.formItem}>
                            <DatePicker
                                style={styles.datePicker}
                                date={AvailableForAttendanceToDate}
                                mode='date'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Date"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(AvailableForAttendanceToDate) => { this.setState({ AvailableForAttendanceToDate }) }}
                            />
                            <DatePicker
                                style={styles.datePicker}
                                date={AvailableForAttendanceToTime}
                                mode='time'
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Time"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(AvailableForAttendanceToTime) => { this.setState({ AvailableForAttendanceToTime }) }}
                            />
                        </View>
                        <Label>Note</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputMultiline} multiline={true} numberOfLines={8} onChangeText={(ScheduleNote) => this.setState({ ScheduleNote })} />
                        </Item>
                        {/* <View style={styles.viewInline}>
                            <View style={styles.viewLabelInline}>
                                {(AllowSelfTimeStamp == false)
                                    ? <Label>Self Registration<Label style={styles.AllowSelfTimeStampNo}>(Not Allow)</Label></Label>
                                    : <Label>Self Registration<Label style={styles.AllowSelfTimeStampYes}>(Allow)</Label></Label>}
                            </View>
                            <View>
                                <Switch onValueChange={(AllowSelfTimeStamp) => { this.setState({ AllowSelfTimeStamp }) }} value={AllowSelfTimeStamp} />
                            </View>
                        </View> */}
                        <Button full disabled={this.state.disabledButtonSave} success style={styles.buttonSubmit} onPress={this.onSubmit}>
                            {(this.state.isLoading) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text style={styles.textButtonSubmit}>Submit</Text>}

                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#FFFFFF',
    },
    form: {
        padding: 10
    },
    formItem: {
        marginBottom: 15,
    },
    inputText: {
        backgroundColor: '#FFFFFF'
    },
    inputMultiline: {
        height: 100,
        backgroundColor: '#FFFFFF'
    },
    datePicker: {
        width: null,
        backgroundColor: '#FFFFFF'
    },
    viewInlineBanner: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
        paddingTop: 15,
    },
    viewInline: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingBottom: 15,
        paddingTop: 15
    },
    viewLabelInline: {
        flex: 1,
        alignItems: 'flex-start'
    },
    AllowSelfTimeStampNo: {
        color: 'red'
    },
    AllowSelfTimeStampYes: {
        color: 'green'
    },
    buttonSubmit: {
        margin: 10,
        marginTop: 30
    },
    textButtonSubmit: {
        color: '#FFFFFF'
    },
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(NewSchedule);
