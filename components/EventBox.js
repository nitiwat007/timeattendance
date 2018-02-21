//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

// create a component
class EventBox extends Component {

    onPress = (eventID, title) => {
        Actions.schedule({ EventID: eventID, EventName: title })
    }

    render() {

        const { title, date, imgUri, eventID } = this.props
        let dateEvent = new Date(date)

        return (
            <Content style={styles.eventContentBox}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail style={styles.eventLogo} square source={require('../resources/images/psulogo.png')} />
                            <Body>
                                <Text>{title}</Text>
                                <Text note>{dateEvent.toDateString()}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Icon name='md-more' />
                        </Right>
                    </CardItem>
                    <CardItem cardBody>
                        {(imgUri != null)
                            ? <Image style={styles.eventImage} source={{ uri: imgUri }} />
                            : <Image style={styles.eventImage} source={require('../resources/images/no-image-available.jpg')} />}
                    </CardItem>
                    <CardItem cardBody>
                        <Body>
                            <Button full light onPress={() => this.onPress(eventID, title)}>
                                <Text style={styles.textRegisterButton}>ลงทะเบียน</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    eventImage: {
        height: 300,
        width: null,
        flex: 1
    },
    eventLogo: {
        width: 21,
        height: 40,
    },
    eventContentBox: {
        padding: 2
    },
    textRegisterButton: {
        color: '#585858',
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default EventBox;
