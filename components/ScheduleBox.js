//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon, Header, Form, Input, Item, Label, Switch, Footer, FooterTab, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import ScheduleApi from '../apis/schedule'
import { connect } from 'react-redux'
import { scheduleSelectToStore } from '../store/actions/scheduleSelect'
// create a component
class ScheduleBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            ScheduleTitleEdit: this.props.ScheduleInfo.ScheduleTitle,
            ScheduleFromEdit: this.props.ScheduleInfo.ScheduleFrom,
            ScheduleToEdit: this.props.ScheduleInfo.ScheduleTo,
            ScheduleNoteEdit: this.props.ScheduleInfo.ScheduleNote,
            AvailableForAttendanceFromEdit: this.props.ScheduleInfo.AvailableForAttendanceFrom,
            AvailableForAttendanceToEdit: this.props.ScheduleInfo.AvailableForAttendanceTo,
            AllowSelfTimeStampEdit: this.props.ScheduleInfo.AllowSelfTimeStamp,
            isLoading: false,
            disabledButtonSave: false
        }
    }

    showMenu = () => {
        this.setState({
            isModalVisible: true
        })
    }

    onPress = (ScheduleID, ScheduleTitle, EventID) => {
        this.props.scheduleSelectToStore(this.props.ScheduleInfo)
        Actions.registattendance({ ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle, EventID: EventID })
    }

    onSave = () => {
        this.setState({
            isLoading: true,
            disabledButtonSave: true
        })
        const memberID = this.props.userDetail[0]
        const { eventSelect, ScheduleInfo } = this.props
        const data = {
            'ScheduleTitle': this.state.ScheduleTitleEdit,
            'ScheduleFrom': this.state.ScheduleFromEdit,
            'ScheduleTo': this.state.ScheduleToEdit,
            'ScheduleNote': this.state.ScheduleNoteEdit,
            'AvailableForAttendanceFrom': this.state.AvailableForAttendanceFromEdit,
            'AvailableForAttendanceTo': this.state.AvailableForAttendanceToEdit
        }
        ScheduleApi.updateSchedule(memberID, eventSelect.EventID, ScheduleInfo.ScheduleID, data)
            .then(data => {
                this.props.loadingdata()
                this.setState({
                    isModalVisible: false,
                    isLoading: false,
                    disabledButtonSave: false
                })
            }).catch(error => {
                alert(error.response.data.Message)
            })
    }

    render() {

        const { ScheduleTitle, ScheduleFrom, ScheduleTo, ScheduleNote, ScheduleID, EventID, AvailableForAttendanceFrom, AvailableForAttendanceTo, AllowSelfTimeStamp, CreatedBy } = this.props
        const { eventSelect, ScheduleInfo } = this.props
        const memberID = this.props.userDetail[0]
        const { isModalVisible } = this.state
        const { ScheduleTitleEdit, ScheduleFromEdit, ScheduleToEdit, ScheduleNoteEdit, AvailableForAttendanceFromEdit, AvailableForAttendanceToEdit, AllowSelfTimeStampEdit } = this.state
        let ScheduleDateTo, ScheduleDateFrom, ScheduleDateTimeTo, ScheduleDateTimeFrom
        try {
            ScheduleDateFrom = ScheduleInfo.ScheduleFrom.split('T')[0]
            ScheduleDateTo = ScheduleInfo.ScheduleTo.split('T')[0]
            ScheduleDateTimeFrom = ScheduleInfo.ScheduleFrom.split('T')[1]
            ScheduleDateTimeTo = ScheduleInfo.ScheduleTo.split('T')[1]
        } catch (error) {
            alert(error)
        }


        return (
            <Content style={styles.scheduleContentBox}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={isModalVisible}>

                    <Header style={styles.headerModal}>
                        <Left>
                            <Button transparent large onPress={() => this.setState({ isModalVisible: false })}>
                                <Icon name='md-close' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ fontWeight: 'bold' }}>Edit Schedule</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>
                    <Content style={styles.contentModal}>
                        <Form style={styles.form}>
                            <Label>Title</Label>
                            <Item regular style={styles.formItem}>
                                <Input style={styles.inputText} value={ScheduleTitleEdit} onChangeText={(ScheduleTitleEdit) => this.setState({ ScheduleTitleEdit })} />
                            </Item>
                            <Label>From</Label>
                            <View style={styles.formItem}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={ScheduleFromEdit}
                                    mode='datetime'
                                    format="YYYY-MM-DD HH:mm:ss"
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
                                    onDateChange={(ScheduleFromEdit) => { this.setState({ ScheduleFromEdit }) }}
                                />
                            </View>
                            <Label>To</Label>
                            <View style={styles.formItem}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={ScheduleToEdit}
                                    mode='datetime'
                                    format="YYYY-MM-DD HH:mm:ss"
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
                                    onDateChange={(ScheduleToEdit) => { this.setState({ ScheduleToEdit }) }}
                                />
                            </View>
                            <Label>Available for Attendance From</Label>
                            <View style={styles.formItem}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={AvailableForAttendanceFromEdit}
                                    mode='datetime'
                                    format="YYYY-MM-DD HH:mm:ss"
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
                                    onDateChange={(AvailableForAttendanceFromEdit) => { this.setState({ AvailableForAttendanceFromEdit }) }}
                                />
                            </View>
                            <Label>Available for Attendance To</Label>
                            <View style={styles.formItem}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={AvailableForAttendanceToEdit}
                                    mode='datetime'
                                    format="YYYY-MM-DD HH:mm:ss"
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
                                    onDateChange={(AvailableForAttendanceToEdit) => { this.setState({ AvailableForAttendanceToEdit }) }}
                                />
                            </View>
                            {/* <View style={styles.viewInline}>
                                <View style={styles.viewLabelInline}>
                                    {(AllowSelfTimeStampEdit == false)
                                        ? <Label>Self Registration<Label style={styles.AllowSelfTimeStampNo}>(Not Allow)</Label></Label>
                                        : <Label>Self Registration<Label style={styles.AllowSelfTimeStampYes}>(Allow)</Label></Label>}
                                </View>
                                <View>
                                    <Switch onValueChange={(AllowSelfTimeStampEdit) => { this.setState({ AllowSelfTimeStampEdit }) }} value={AllowSelfTimeStampEdit} />
                                </View>
                            </View> */}
                            <View style={{ paddingTop: 15 }}>
                                <Label>Note</Label>
                                <Item regular style={styles.formItem}>
                                    <Input style={styles.inputMultiline} multiline={true} value={ScheduleNoteEdit} numberOfLines={8} onChangeText={(ScheduleNoteEdit) => this.setState({ ScheduleNoteEdit })} />
                                </Item>
                            </View>
                        </Form>
                    </Content>
                    <Footer>
                        <FooterTab style={{ backgroundColor: "#FFF" }}>
                            <Button disabled={this.state.disabledButtonSave} full success onPress={this.onSave}>
                                {(this.state.isLoading) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>SAVE</Text>}
                            </Button>
                        </FooterTab>
                    </Footer>
                </Modal>
                <View>
                    <Card>
                        <CardItem style={styles.scheduleTitleItem}>
                            <Left style={{ flex: 8 }}>
                                <Body >
                                    <Text style={styles.titleText}>{ScheduleInfo.ScheduleTitle}</Text>
                                </Body>
                            </Left>
                            <Right style={{ flex: 1 }}>
                                {(memberID === eventSelect.CreatedBy) &&
                                    <Button transparent style={styles.buttonMoreMenu} full large dark onPress={this.showMenu}>
                                        <Icon name='md-create' />
                                    </Button>
                                }
                            </Right>
                        </CardItem>
                        <CardItem style={styles.scheduleDateTimeItem}>
                            <Left>
                                <Body>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Icon name='md-calendar' style={{ flex: 1, fontSize: 20 }} />
                                        <Text style={{ flex: 9 }}><Text note>{ScheduleDateFrom}</Text> - <Text note>{ScheduleDateTo}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Icon name='md-time' style={{ flex: 1, fontSize: 20 }} />
                                        {(moment.duration(moment(ScheduleInfo.ScheduleTo).diff(moment(new Date()))) < 0) ?
                                            <Text style={{ flex: 9 }}><Text note>{ScheduleDateTimeFrom}</Text> - <Text note>{ScheduleDateTimeTo}</Text><Text style={{ color: 'red' }}> ({moment(ScheduleInfo.ScheduleFrom).fromNow()})</Text></Text>
                                            :
                                            <Text style={{ flex: 9 }}><Text note>{ScheduleDateTimeFrom}</Text> - <Text note>{ScheduleDateTimeTo}</Text><Text> ({moment(ScheduleInfo.ScheduleFrom).fromNow()})</Text></Text>
                                        }

                                    </View>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem style={styles.scheduleNoteItem}>
                            <Left>
                                <Body>
                                    <Text>Note</Text>
                                    <Text note>
                                        {ScheduleInfo.ScheduleNote}
                                    </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody style={styles.scheduleSelectItem}>
                            <Body>
                                <Button full style={{ backgroundColor: '#034488' }} onPress={() => this.onPress(ScheduleID, ScheduleTitle, EventID)}>
                                    <Text style={styles.textRegisterButton}>Select</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </Content>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    scheduleContentBox: {
        padding: 5
    },
    scheduleTitleItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingTop: 25,
        paddingBottom: 25,
        flex: 1,
        flexDirection: 'row'
    },
    scheduleDateTimeItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    scheduleNoteItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    buttonMoreMenu: {
        width: 30,
        height: 20
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#178fd6'
    },
    textRegisterButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    headerModal: {
        //marginTop: (Platform.OS === 'android') ? Expo.Constants.statusBarHeight : 0,
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
    contentModal: {
        backgroundColor: '#F2F2F2'
    },
    datePicker: {
        width: null,
        backgroundColor: '#FFFFFF'
    },
    inputMultiline: {
        height: 150,
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
        borderBottomWidth: 0,
        borderRadius: 0,
        paddingBottom: 15,
        paddingTop: 15,
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
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail,
        eventSelect: state.eventSelect
    }
}

//make this component available to the app
export default connect(mapStateToProps, { scheduleSelectToStore })(ScheduleBox);
