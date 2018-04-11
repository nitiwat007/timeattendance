//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Thumbnail } from 'native-base'
import { connect } from 'react-redux';
import moment from 'moment'

import AppHeaderBack from '../Headers/AppHeaderBack'
import ScheduleBox from '../ScheduleBox'
import ScheduleApi from '../../apis/schedule'

// create a component
class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedules: [],
            isLoading: true,
            refreshing: false
        }
    }

    onRefresh = () => {
        this.setState({
            schedules: []
        })
        const memberID = this.props.userDetail[0]
        const { eventSelect } = this.props
        ScheduleApi.getScheduleByEventID(memberID, eventSelect.EventID).then(data => {
            this.setState({
                isLoading: false,
                schedules: data,
                refreshing: false
            })
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response)
            }
        })
    }

    componentDidMount() {
        const memberID = this.props.userDetail[0]
        const { eventSelect } = this.props
        ScheduleApi.getScheduleByEventID(memberID, eventSelect.EventID).then(data => {
            this.setState({
                schedules: data,
                isLoading: false
            })
            //console.log(data)
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response)
            }
        })
        //console.log(this.props.eventSelect)
    }

    render() {

        const { eventSelect } = this.props
        const { refreshing, schedules, isLoading, EditScheduleVisible } = this.state
        const memberID = this.props.userDetail[0]

        return (
            <Container style={styles.container}>
                {(memberID === eventSelect.CreatedBy) ?
                    <AppHeaderBack title={'Schedules'} component='newschedule' eventid={eventSelect.EventID} />
                    : <AppHeaderBack title='Schedules' eventid={eventSelect.EventID} />}
                <ScrollView
                    ref='scrollView'
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            title='loading data'
                        />
                    }
                >
                    <View style={styles.content}>
                        <View style={styles.contentHeader}>
                            <View style={styles.iconContainer}>
                                <Icon name="md-time" style={{ color: '#178fd6' }} />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.EventName}>{eventSelect.EventNameEN}</Text>
                            </View>
                        </View>
                        <View>
                            {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}

                            {schedules.sort((a, b) => (moment.duration(moment(a.ScheduleTo).add(5, 'hours').diff(moment(new Date()))) < 0 ? 0 : 1)
                                > (moment.duration(moment(b.ScheduleTo).add(5, 'hours').diff(moment(new Date()))) < 0 ? 0 : 1) ? -1 : 0)
                                .map((schedule, i) =>
                                    <ScheduleBox
                                        key={i}
                                        EventID={eventSelect.EventID}
                                        EventCreatedBy={eventSelect.CreatedBy}
                                        ScheduleTitle={schedule.ScheduleTitle}
                                        ScheduleFrom={schedule.ScheduleFrom}
                                        ScheduleTo={schedule.ScheduleTo}
                                        ScheduleNote={schedule.ScheduleNote}
                                        ScheduleID={schedule.ScheduleID}
                                        AvailableForAttendanceFrom={schedule.AvailableForAttendanceFrom}
                                        AvailableForAttendanceTo={schedule.AvailableForAttendanceTo}
                                        AllowSelfTimeStamp={schedule.AllowSelfTimeStamp}
                                        loadingdata={this.onRefresh}
                                        CreatedBy={schedule.CreatedBy}
                                        ScheduleInfo={schedule}
                                    />
                                )}

                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcf6'
    },
    contentHeader: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        padding: 10
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    detailContainer: {
        flex: 8,
        alignItems: 'flex-start',
        paddingTop: 5
    },
    EventName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ActivityIndicator: {
        paddingTop: 20
    },
    content: {
        paddingBottom: 10
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail,
        eventSelect: state.eventSelect
    }
}
export default connect(mapStateToProps, null)(Schedule);
