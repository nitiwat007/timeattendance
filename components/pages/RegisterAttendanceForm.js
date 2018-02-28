//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

// create a component
class RegisterAttendanceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: this.props.ID
        }
    }

    onSubmit = () => {
        alert(this.state.ID)
    }

    componentDidMount() {
        if (this.state.ID === undefined) {
            this.setState({
                ID: ''
            })
        }
    }

    render() {
        const { ScheduleID, EventID, ScheduleTitle } = this.props
        const { ID } = this.state
        return (
            <Container style={styles.container}>
                <AppHeaderBack title='Registration' />
                <Content>
                    <Form style={styles.form}>
                        <Label>ID</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} value={ID} onChangeText={(ID) => this.setState({ ID })} />
                        </Item>
                        <Label>Fullname</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} />
                        </Item>
                        <Label>Email</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} />
                        </Item>
                        <Label>Phone Number</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} />
                        </Item>
                        <Label>Note</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} />
                        </Item>
                        <Button block success style={styles.buttonSubmit} onPress={this.onSubmit}>
                            <Text style={styles.textButtonSubmit}>Submit</Text>
                        </Button>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => Actions.registattendance({ ScheduleID: ScheduleID, EventID: EventID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-qr-scanner" />
                            <Text>QR Code</Text>
                        </Button>
                        <Button vertical active onPress={() => Actions.registattendanceform({ ScheduleID: ScheduleID, EventID: EventID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="md-people" onPress={()=> alert('Not Implemented')}/>
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
        flex: 1
    },
    form: {
        padding: 10
    },
    formItem: {
        marginBottom: 15,
    },
    inputText: {
        backgroundColor: '#FFFFFF'
    },
    buttonSubmit: {
        margin: 10,
        marginTop: 30
    },
    textButtonSubmit: {
        color: '#FFFFFF'
    },
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendanceForm);
