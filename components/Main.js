//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            events: []
        }
    }


    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    componentDidMount() {
        const memberID = this.props.userDetail[0]

        EventApi.getByMemberID(memberID).then(data => {
            this.setState({
                events: data
            })       
        })
    }

    render() {

        const { events } = this.state

        return (
            <Drawer ref={(ref) => { this.drawer = ref }} content={<SideBar />} onClose={() => this.closeDrawer()}>
                <Container>
                    <AppHeader title='หน้าหลัก' openDrawer={this.openDrawer.bind(this)} />
                    <Content>
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
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(Main);
