//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { Actions } from 'react-native-router-flux'

// create a component
class RegisterAttendanceList extends Component {
    render() {

        const { ScheduleID, EventID, ScheduleTitle } = this.props

        return (
            <Container style={styles.container}>
                <AppHeaderHome title={ScheduleTitle} />
                <Content>
                    
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor:"#FFF"}}>                       
                        <Button vertical onPress={() => Actions.registattendanceform({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical  onPress={() => Actions.registattendance({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-qr-scanner" />
                            <Text>QR Code</Text>
                        </Button>
                        <Button vertical active onPress={() => Actions.registattendancelist({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-people" />
                            <Text>List</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default RegisterAttendanceList;
