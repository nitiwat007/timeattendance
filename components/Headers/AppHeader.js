//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Expo from 'expo'

// create a component
class AppHeader extends Component {
    render() {

        const title = this.props.title

        return (
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={() => this.props.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>{title}</Title>
                </Body>
                <Right>
                    {/* <Button iconLeft transparent onPress={() => Actions.newevent()}>
                        <Icon name='ios-add-circle-outline' />
                    </Button> */}
                </Right>
            </Header>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    header: {
        marginTop: (Platform.OS === 'android') ? Expo.Constants.statusBarHeight : 0,
    },
    textButton: {
        fontSize: 12,
        padding: 5,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default AppHeader;
