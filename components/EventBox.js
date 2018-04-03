//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { eventSelectToStore } from '../store/actions/eventSelect'
import moment from 'moment'

// create a component
class EventBox extends Component {

    onPressSchedule = () => {
        this.props.eventSelectToStore(this.props.EventInfo)
        Actions.schedule()
    }

    onPressAttendees = () => {
        this.props.eventSelectToStore(this.props.EventInfo)
        Actions.attendees()
    }

    onEventDetail = ()=>{
        this.props.eventSelectToStore(this.props.EventInfo)
        Actions.eventdetail()
    }



    render() {

        //const { title, date, imgUri, eventID, CreatedBy } = this.props
        const { EventInfo } = this.props
        const dateEvent = moment(EventInfo.EventDate)
        return (
            <Card>
                <CardItem style={{ flex: 1, flexDirection: 'row' }} button onPress={() => this.onEventDetail()}>
                    <Left style={{ flex: 8 }}>
                        <Thumbnail style={styles.eventLogo} square source={require('../resources/images/50years.png')} />
                        <Body>
                            <Text>{EventInfo.EventNameEN}</Text>
                            <Text note>{dateEvent.format('DD MMMM YYYY')}</Text>
                        </Body>
                    </Left>
                    <Right style={{ flex: 1 }}>

                    </Right>
                </CardItem>
                <CardItem cardBody button onPress={() => this.onEventDetail()}>
                    {(EventInfo.EventBannerLink != null)
                        ? <Image style={styles.eventImage} source={{ uri: EventInfo.EventBannerLink }} />
                        : <Image style={styles.eventImage} source={require('../resources/images/no-image-available.jpg')} />}
                </CardItem>
                <CardItem cardBody>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Button full transparent onPress={() => this.onPressSchedule()}>
                                <Icon name='md-time' style={{ color: '#178fd6' }} />
                                <Text style={styles.textRegisterButton}>Schedules</Text>
                            </Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button full transparent info onPress={() => this.onPressAttendees()}>
                                <Icon name='md-people' style={{ color: '#f9acbb' }} />
                                <Text style={styles.textRegisterButton}>Attendees</Text>
                            </Button>
                        </View>
                    </View>
                </CardItem>
            </Card>
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 9 / 16,
        width: null,
        flex: 1,
    },
    eventLogo: {
        width: 45,
        height: 45,
    },
    eventContentBox: {
        padding: 5
    },
    textRegisterButton: {
        color: '#585858',
        fontWeight: 'bold'
    },
    buttonMoreMenu: {
        width: 30
    },
});

//make this component available to the app
export default connect(null, { eventSelectToStore })(EventBox);
