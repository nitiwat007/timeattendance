//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base'

import AppHeaderBack from '../Headers/AppHeaderBack'

// create a component
class NewEvent extends Component {
    render() {
        return (
            <Container>
                <AppHeaderBack title='สร้างกิจกรรม' />
                <Content>

                </Content>
            </Container>
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
export default NewEvent;
