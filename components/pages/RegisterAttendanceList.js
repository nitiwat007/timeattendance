//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button, Card, CardItem, Left, Body } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { Actions } from 'react-native-router-flux'
import AttendanceApi from '../../apis/attendance'
import { connect } from 'react-redux'

// create a component
class RegisterAttendanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendances: [],
            memberID: this.props.userDetail[0],
            EventID: this.props.EventID,
            ScheduleID: this.props.ScheduleID,
            ScheduleTitle: this.props.ScheduleTitle,
            isLoading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        const { memberID, ScheduleID, EventID, ScheduleTitle } = this.state
        AttendanceApi.getAttendances(memberID, EventID, ScheduleID).then(data => {
            //console.log(data)
            this.setState({
                attendances: data,
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

    onRefresh() {
        const { memberID, ScheduleID, EventID, ScheduleTitle } = this.state
        AttendanceApi.getAttendances(memberID, EventID, ScheduleID).then(data => {
            this.setState({
                attendances: data,
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

    render() {

        const { ScheduleID, EventID, ScheduleTitle, attendances, isLoading, refreshing } = this.state

        return (
            <Container style={styles.container}>
                <AppHeaderHome title={ScheduleTitle} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            title='loading data'
                        />
                    }
                >
                    <Content style={styles.content}>
                        {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>Number of registrations : {attendances.length}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        {attendances.sort((a, b) => new Date(a.CheckedInDateTime) < new Date(b.CheckedInDateTime)).map((attendance, i) =>
                            <Card key={i} style={styles.cardAttendance}>
                                <CardItem style={styles.cardItemFullname}>
                                    <Left>
                                        <Icon name="md-contact" />
                                        <Body>
                                            <Text style={styles.textFullname}>{attendance.AttendeeFullName}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                {(attendance.CheckedInDateTime !== null) &&
                                    <CardItem style={styles.cardItem}>
                                        <Left>
                                            <Body>
                                                <Text style={styles.textLabelCheckIn}>Check In  : <Text note>{attendance.CheckedInDateTime.split('T')[0]}</Text> Time : <Text note>{attendance.CheckedInDateTime.split('T')[1].split('.')[0]}</Text></Text>
                                                <Text style={styles.textLabelCheckBy}>Check By : <Text note>{attendance.CheckedInBy}</Text></Text>
                                            </Body>
                                        </Left>
                                    </CardItem>}
                                {(attendance.CheckedOutDateTime !== null) &&
                                    <CardItem style={styles.cardItem}>
                                        <Left>
                                            <Body>
                                                <Text style={styles.textLabelCheckOut}>Check Out  : <Text note>{attendance.CheckedOutDateTime.split('T')[0]}</Text> Time : <Text note>{attendance.CheckedOutDateTime.split('T')[1].split('.')[0]}</Text></Text>
                                                <Text style={styles.textLabelCheckBy}>Check By : <Text note>{attendance.CheckedOutBy}</Text></Text>
                                            </Body>
                                        </Left>
                                    </CardItem>}
                            </Card>
                        )}
                    </Content>
                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button vertical onPress={() => Actions.reset('registattendanceform', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.reset('registattendance', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-qr-scanner" />
                            <Text>QR Code</Text>
                        </Button>
                        <Button vertical active onPress={() => Actions.reset('registattendancelist', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
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
    cardAttendance:{
        marginBottom:30
    },
    cardItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    cardItemFullname:{
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        backgroundColor:'#FAFAFA'
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
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendanceList);
