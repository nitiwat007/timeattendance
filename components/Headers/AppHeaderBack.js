//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import Expo from 'expo'

// create a component
class AppHeaderBack extends Component {

    OnSelect = () => {
        Actions.pop();
    }

    render() {

        const { title, component, eventid } = this.props

        return (
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={this.OnSelect}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.titleText}>{title}</Title>
                </Body>
                <Right>
                    {(component === undefined) ? null :
                        <Button iconLeft transparent onPress={() => Actions.jump(component, { EventID: eventid })}>
                            <Icon name='ios-add-circle-outline' />
                        </Button>
                    }
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
    titleText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default AppHeaderBack;
