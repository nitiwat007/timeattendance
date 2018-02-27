//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal, ScrollView, RefreshControl } from 'react-native';
import { Container, Drawer, Content } from 'native-base'
import { connect } from 'react-redux';

import SideBar from '../SideBar'
import AppHeader from '../Headers/AppHeader'
import EventBox from '../EventBox'

import EventApi from '../../apis/event'

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

    onRefresh() {
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
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response.status)
                this.setState({
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
                <Container>
                    <AppHeader title='My Event' openDrawer={this.openDrawer.bind(this)} />
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                title='loading data'
                            />
                        }
                    >
                        <Content>

                            {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                            {events.map((event, i) =>
                                <EventBox key={i} title={event.EventNameEN} date={event.EventDate} imgUri={event.EventBannerLink} eventID={event.EventID} />
                            )}

                        </Content>
                    </ScrollView>
                </Container>
            </Drawer>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6'
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
