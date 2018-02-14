//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button } from 'native-base';

// create a component
class EventBox extends Component {

    onPress = (eventID)=>{
        alert(eventID)
    }

    render() {

        const { title, date, imgUri, eventID } = this.props

        return (
            <Content style={styles.eventContentBox}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail style={styles.eventLogo} square source={require('../resources/images/psulogo.png')} />
                            <Body>
                                <Text>{title}</Text>
                                <Text note>{date}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image style={styles.eventImage} source={{ uri: imgUri }} />
                    </CardItem>
                    <CardItem cardBody>
                        <Body>
                            <Button full light onPress={()=> this.onPress(eventID)}>
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
