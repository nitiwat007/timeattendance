//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Segment, Text, Content } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Expo from 'expo'

// create a component
class AppHeaderSegment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            segmentFirst: true,
            segmentLast: false
        }
    }

    OnSelect = () => {
        Actions.pop();
    }

    onSegment = (action) => {
        if (action == 'first') {
            this.props.actionType('attendees')
            this.setState({
                segmentFirst: true,
                segmentLast: false
            })
        } else {
            this.props.actionType('registrars')
            this.setState({
                segmentFirst: false,
                segmentLast: true
            })
        }
    }

    render() {

        const title = this.props.title
        const { segmentFirst, segmentLast } = this.state

        return (
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={this.OnSelect}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body style={{ flex: 4 }}>
                    <View style={{ paddingTop: 5 }}>
                        <Segment style={{ alignItems: 'center' }}>
                            <Button first active={segmentFirst} onPress={() => this.onSegment('first')}><Text style={styles.segmentButtonText}>Attendees</Text></Button>
                            <Button last active={segmentLast} onPress={() => this.onSegment('last')}><Text style={styles.segmentButtonText}>Registrar</Text></Button>
                        </Segment>
                    </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    header: {
        marginTop: (Platform.OS === 'android') ? Expo.Constants.statusBarHeight : 0,
        height: 90
    },
    segmentButton: {
        fontSize: 10
    }
});

//make this component available to the app
export default AppHeaderSegment;
