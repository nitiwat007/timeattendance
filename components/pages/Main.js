//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, ScrollView, RefreshControl } from 'react-native';
import { Container, Drawer, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

import SideBar from '../SideBar'
import AppHeader from '../Headers/AppHeader'
import EventBox from '../EventBox'

import EventApi from '../../apis/event'
import moment from 'moment'

// create a component
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            isLoading: true,
            refreshing: false
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        const memberID = this.props.userDetail[0]
        EventApi.getByMemberID(memberID).then(data => {
            this.setState({
                events: data,
                isLoading: false
            })
        }).catch(error => {
            //console.log(error.response.data.Message)
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
            events: []
        })
        const memberID = this.props.userDetail[0]
        this.setState({ refreshing: true })
        EventApi.getByMemberID(memberID).then(data => {
            this.setState({
                events: data,
                isLoading: false,
                refreshing: false
            })
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    events: [],
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response.data.Message)
                this.setState({
                    events: [],
                    isLoading: false,
                    refreshing: false
                })
            }
        })
    }

    render() {

        const { events, isLoading, refreshing } = this.state

        return (
            <Drawer ref={(ref) => { this.drawer = ref }} content={<SideBar closeDrawer={this.closeDrawer.bind(this)} />} onClose={() => this.closeDrawer()}>
                <Container style={styles.container}>
                    <AppHeader title='My Event' openDrawer={this.openDrawer.bind(this)} />
                    <ScrollView
                        ref='scrollView'
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                                title='loading data'
                            />
                        }
                    >
                        <Content style={{ padding: 5 }}>
                            {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}

                            {(events.sort((a, b) =>
                                (moment.duration(moment(a.EventDate).add(1, 'days').diff(moment(new Date()).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))) < 0 ? 0 : 1)
                                    >
                                    (moment.duration(moment(b.EventDate).add(1, 'days').diff(moment(new Date()).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))) < 0 ? 0 : 1)
                                    ? -1 : 0)
                                .map((event, i) =>
                                    <EventBox
                                        key={i}
                                        EventInfo={event}
                                        EventRefresh={this.onRefresh}
                                    />
                                ))}
                        </Content>
                    </ScrollView>
                    <Footer>
                        <FooterTab style={{ backgroundColor: "#FFF" }}>
                            {/* <Button vertical full active onPress={() => Actions.main()}> */}
                            <Button vertical full active onPress={() => this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true })}>
                                <Icon name="md-home" />
                                <Text>My Events</Text>
                            </Button>
                            <Button vertical full onPress={() => Actions.responsibleevent()}>
                                <Icon name="md-browsers" />
                                <Text>Responsible Events</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Drawer>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    ActivityIndicator: {
        paddingTop: 20
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(Main);
