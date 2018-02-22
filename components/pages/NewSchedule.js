//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Thumbnail } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'

// create a component
class NewSchedule extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <AppHeaderBack title='เพิ่มตารางเวลา' />
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
        backgroundColor: '#FFFFFF',
    },
});

//make this component available to the app
export default NewSchedule;
