//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Thumbnail } from 'native-base'

import AppHeaderBack from '../Headers/AppHeaderBack'

// create a component
class Schedule extends Component {
    render() {

        const { EventID, EventName } = this.props

        return (
            <Container style={styles.container}>
                <AppHeaderBack title='ตารางเวลา' component='newschedule'/>
                <Content>
                    <Header style={styles.contentHeader}>
                        <View style={styles.iconContainer}>
                            <Icon name="md-clipboard" />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.EventName}>{EventName}</Text>
                        </View>
                    </Header>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    contentHeader: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
    }
});

//make this component available to the app
export default Schedule;
