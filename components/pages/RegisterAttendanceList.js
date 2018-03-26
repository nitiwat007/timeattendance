//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button, Card, CardItem, Left, Body } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { Actions } from 'react-native-router-flux'
import AttendanceApi from '../../apis/attendance'
import { connect } from 'react-redux'
import ListBox from '../ListBox'

// create a component
class RegisterAttendanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendances: [],
            attendancesSearch: [],
            memberID: this.props.userDetail[0],
            EventID: this.props.EventID,
            ScheduleID: this.props.ScheduleID,
            ScheduleTitle: this.props.ScheduleTitle,
            isLoading: true,
            refreshing: false,
            searchData: '',
            sortSwitch: false,
            sortBy: 'Check In',
            searchMenu: false
        }
    }

    componentDidMount() {
        const { memberID, ScheduleID, EventID, ScheduleTitle } = this.state
        AttendanceApi.getAttendances(memberID, EventID, ScheduleID).then(data => {
            //console.log(data)
            this.setState({
                attendances: data,
                attendancesSearch: data,
                isLoading: false,
                refreshing: false
            })
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response.data.Message)
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            }
        })
    }

    onRefresh = () => {
        this.setState({
            attendances: [],
            attendancesSearch: []
        })
        const { memberID, ScheduleID, EventID, ScheduleTitle } = this.state
        AttendanceApi.getAttendances(memberID, EventID, ScheduleID).then(data => {
            this.setState({
                attendances: data,
                attendancesSearch: data,
                isLoading: false,
                refreshing: false,
                sortSwitch: false,
                sortBy: 'Check In'
            })
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response.data.Message)
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            }
        })
    }

    onSearch = (event) => {
        if (event != '') {
            this.setState({
                sortSwitch: false,
                sortBy: 'Check In',
                attendances: this.state.attendancesSearch.filter(x => x.AttendeeFullName.match(event))
            })
        } else {
            this.setState({
                sortSwitch: false,
                sortBy: 'Check In',
                attendances: this.state.attendancesSearch
            })
        }
    }

    onSort = async () => {
        this.setState({ isLoading: true, attendances: [] })
        if (this.state.sortSwitch) {
            let attendancesSorted = await this.state.attendances.sort((a, b) => new Date(a.CheckedInDateTime) > new Date(b.CheckedInDateTime) ? -1 : 0)
            this.setState({
                sortSwitch: false,
                sortBy: 'Check In',
                attendances: attendancesSorted,
                isLoading: false
            })
        } else {
            let attendancesSorted = await this.state.attendances.sort((a, b) => new Date(a.CheckedOutDateTime) > new Date(b.CheckedOutDateTime) ? -1 : 0)
            this.setState({
                sortSwitch: true,
                sortBy: 'Check Out',
                attendances: attendancesSorted,
                isLoading: false
            })
        }

    }

    onSearchMenuChange = async () => {
        this.setState({ attendances: [] })
        let attendancesSorted = await this.state.attendances.sort((a, b) => new Date(a.CheckedInDateTime) > new Date(b.CheckedInDateTime) ? -1 : 0)
        this.setState({
            attendances: attendancesSorted
        })
    }

    onSearchMenu = () => {
        if (this.state.searchMenu) {
            this.setState({
                searchMenu: false
            })
            this.onSearchMenuChange()
        } else {
            this.setState({
                searchMenu: true
            })
            this.onSearchMenuChange()
        }
    }

    render() {

        const { ScheduleID, EventID, ScheduleTitle, attendances, isLoading, refreshing, searchData, searchMenu } = this.state

        return (
            <Container style={styles.container}>
                <AppHeaderHome title={ScheduleTitle} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            title='loading data'
                        />
                    }
                >
                    <Content style={styles.content}>
                        {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                        {(searchMenu) &&
                            <View>
                                <Item regular style={styles.formItemCode}>
                                    <Input style={styles.inputText} onChangeText={this.onSearch} placeholder='Search by Name' />
                                </Item>
                                <View style={styles.viewInline}>
                                    <View style={{ flex: 5 }}>
                                        <Text>Sort by {this.state.sortBy}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Switch onValueChange={this.onSort} value={this.state.sortSwitch} />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: '#E6E6E6',
                                        borderBottomWidth: 1,
                                        marginBottom: 10
                                    }}
                                />
                            </View>
                        }
                        {
                            <View>
                                <Card style={{ marginBottom: 15 }}>
                                    <CardItem>
                                        <Body>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ flex: 6, marginTop: 13 }}>Number of registrations : {attendances.filter((data) => (data.CheckedInDateTime === null && data.CheckedOutDateTime === null) ? 0 : 1).length}</Text>
                                                <Button onPress={this.onSearchMenu} light style={{ flex: 1 }}>
                                                    <Icon name='md-search' />
                                                </Button>
                                            </View>

                                        </Body>
                                    </CardItem>
                                </Card>
                                <View
                                    style={{
                                        borderBottomColor: '#E6E6E6',
                                        borderBottomWidth: 1,
                                        marginBottom: 10
                                    }}
                                />
                                {attendances.filter((data) => (data.CheckedInDateTime === null && data.CheckedOutDateTime === null) ? 0 : 1).map((attendance, i) =>
                                    <View>
                                        <ListBox
                                            eventid={attendance.EventID}
                                            scheduleid={attendance.ScheduleID}
                                            attendeeid={attendance.AttendeeID}
                                            fullname={attendance.AttendeeFullName}
                                            checkindatetime={attendance.CheckedInDateTime}
                                            checkinby={attendance.CheckedInBy}
                                            checkoutdatetime={attendance.CheckedOutDateTime}
                                            checkoutby={attendance.CheckedOutBy}
                                            typelistbox='listresult'
                                            loadingdata={this.onRefresh}
                                        />
                                    </View>

                                )}
                            </View>}
                    </Content>
                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button vertical full onPress={() => Actions.reset('registattendanceform', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical full onPress={() => Actions.reset('registattendance', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-qr-scanner" />
                            <Text>Scan</Text>
                        </Button>
                        <Button vertical full active onPress={() => Actions.reset('registattendancelist', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
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
        flex: 1,
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
    content: {
        padding: 10
    },
    textFullname: {

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
    formItemCode: {
        marginBottom: 15,
        flex: 2
    },
    inputText: {
        backgroundColor: '#FFFFFF'
    },
    viewInline: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 7,
        marginLeft: 3,
        marginBottom: 15,
        backgroundColor: '#FFFFFF'
    },
    ActivityIndicator: {
        padding: 20
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendanceList);
