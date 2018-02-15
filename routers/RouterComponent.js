//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import Login from '../components/pages/Login'
import Main from '../components/pages/Main'
import NewEvent from '../components/pages/NewEvent'

// create a component
class RouterComponent extends Component {
    render() {
        return (
            <Router hideNavBar>
                <Scene>
                    <Scene key='login' component={Login} hideNavBar />
                    <Scene key='main' component={Main} hideNavBar />
                    <Scene key='newevent' component={NewEvent} hideNavBar />
                </Scene>
            </Router>
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
export default RouterComponent;
