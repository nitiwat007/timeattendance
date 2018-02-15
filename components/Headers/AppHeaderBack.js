//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

// create a component
class AppHeaderBack extends Component {

    OnSelect = () => {
        Actions.pop();
    }

    render() {

        const { title, component } = this.props

        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.OnSelect}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {(component === undefined) ? null :
                        <Button iconLeft transparent onPress={() => Actions[component].call()}>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AppHeaderBack;
