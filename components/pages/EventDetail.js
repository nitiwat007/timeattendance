//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, ScrollView, RefreshControl } from 'react-native';
import { Container, Drawer, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import { connect } from 'react-redux'

// create a component
class EventDetails extends Component {
    render() {

        const { eventSelect } = this.props

        return (
            <Container style={styles.container}>
                <AppHeaderBack title={eventSelect.EventNameEN} eventid={eventSelect.EventID} />
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail,
        eventSelect: state.eventSelect
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(EventDetails);
