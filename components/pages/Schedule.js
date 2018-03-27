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
        const { EventID } = this.props
        ScheduleApi.getScheduleByEventID(memberID, EventID).then(data => {
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
        const { EventID } = this.props
        ScheduleApi.getScheduleByEventID(memberID, EventID).then(data => {
            this.setState({
                schedules: data,
                isLoading: false
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

    render() {

        const { EventID, EventName } = this.props
        const { refreshing, schedules, isLoading, EditScheduleVisible } = this.state

        return (
            <Container style={styles.container}>
                <AppHeaderBack title='Schedules' component='newschedule' eventid={EventID} />
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
                        <View style={styles.contentHeader}>
                            <View style={styles.iconContainer}>
                                <Icon name="md-time" style={{ color: '#5cb85c' }} />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.EventName}>{EventName}</Text>
                            </View>
                        </View>
                        <View>
                            {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}

                            {schedules.sort((a, b) => (moment.duration(moment(a.ScheduleTo).add(5, 'hours').diff(moment(new Date()))) < 0 ? 0 : 1)
                                > (moment.duration(moment(b.ScheduleTo).add(5, 'hours').diff(moment(new Date()))) < 0 ? 0 : 1) ? -1 : 0)
                                .map((schedule, i) =>
                                    <ScheduleBox
                                        key={i}
                                        EventID={EventID}
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
                                    />
                                )}

                        </View>
                    </Content>
                </ScrollView>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
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
        fontWeight: 'bold'
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
        userDetail: state.userDetail
    }
}
export default connect(mapStateToProps, null)(Schedule);
