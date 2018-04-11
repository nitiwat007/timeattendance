//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Left, Right, Thumbnail, List, ListItem } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import QRCode from 'react-native-qrcode'

// create a component
class AttendeeDetail extends Component {
    render() {

        const { Code, FullName, TYPE, ID } = this.props

        return (
            <Container style={styles.container}>
                <AppHeaderBack title={FullName} />
                <ScrollView>
                    <Content>
                        <View style={styles.contentHeader}>
                            <View style={styles.iconContainer}>
                                <Icon style={{ color: '#f9acbb' }} name="md-people" />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.EventName}>{(FullName == null) ? ID : FullName}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20, padding: 10 }}>
                            <QRCode
                                value={Code}
                                size={300}
                                bgColor='#0f7e9b'
                            />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text>
                                {(TYPE == 'attendees') ? Code : ID}
                            </Text>
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
        flex: 6,
        alignItems: 'flex-start',
        paddingTop: 5
    }
});

//make this component available to the app
export default AttendeeDetail;
