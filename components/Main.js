//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Container, Drawer, Content } from 'native-base'
import { connect } from 'react-redux';

import SideBar from './SideBar'
import AppHeader from './Headers/AppHeader'
import EventBox from './EventBox'

import EventApi from '../apis/event'

// create a component
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            isLoading: true
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
        })
    }

    render() {

        const { events, isLoading } = this.state

        return (
            <Drawer ref={(ref) => { this.drawer = ref }} content={<SideBar />} onClose={() => this.closeDrawer()}>
                <Container>
                    <AppHeader title='หน้าหลัก' openDrawer={this.openDrawer.bind(this)} />
                    <Content>
                        {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                        {events.map((event, i) =>
                            <EventBox key={i} title={event.EventNameEN} date={event.EventDate} imgUri={event.EventBannerLink} eventID={event.EventID} />
                        )}
                    </Content>
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
