//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Thumbnail } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'

// create a component
class Attendees extends Component {
    render() {
        const { EventID, EventName } = this.props
        return (
            <Container style={styles.container}>
                <AppHeaderBack title='Attendees' component='attendees' eventid={EventID} />
                <ScrollView>
                    <Content style={styles.content}>
                        <View style={styles.contentHeader}>
                            <View style={styles.iconContainer}>
                                <Icon style={{ color: '#62B1F6' }} name="md-people" />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.EventName}>{EventName}</Text>
                            </View>
                        </View>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingBottom: 10
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
});

//make this component available to the app
export default Attendees;
