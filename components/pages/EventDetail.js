//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, ScrollView, RefreshControl } from 'react-native';
import { Container, Drawer, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'

// create a component
class EventDetails extends Component {
    render() {

        const { EventID, EventName } = this.props

        return (
            <Container style={styles.container}>
                <AppHeaderBack title={EventName} eventid={EventID} />
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

//make this component available to the app
export default EventDetails;
