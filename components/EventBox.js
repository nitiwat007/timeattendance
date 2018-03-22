//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import moment from 'moment'

// create a component
class EventBox extends Component {

    onPressSchedule = (eventID, title) => {
        Actions.schedule({ EventID: eventID, EventName: title })
    }

    onPressAttendees = (eventID, title) => {
        Actions.attendees({ EventID: eventID, EventName: title })
    }

    // setMenuRef = ref => {
    //     this.menu = ref;
    // };

    // menu = null;

    // menuItemAction = (action) => {
    //     if (action === 'edit') {
    //         Actions.schedule()
    //         this.menu.hide()
    //     } else if (action === 'remove') {
    //         this.menu.hide()
    //     }
    // };

    // showMenu = () => {
    //     this.menu.show();
    // };

    render() {

        const { title, date, imgUri, eventID } = this.props
        const dateEvent = moment(date)
        //const dateNow = new Date()
        //const diff = moment.duration(moment(dateEvent).diff(moment(dateNow).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })))
        // const diffDays = parseInt(diff.asDays())
        // const diffHours = parseInt(diff.asHours()) - diffDays * 24
        // const diffMinutes = parseInt(diff.asMinutes()) - (diffDays * 24 * 60 + diffHours * 60)
        // console.log(moment(dateEvent))
        // console.log(moment(moment(dateNow).utcOffset(0).set({hour:0,minute:0,second:0,millisecond:0})))
        // console.log(diffDays)
        // console.log(diffHours)
        // console.log(diffMinutes)
        return (
            //<Content style={styles.eventContentBox}>
            <Card>
                <CardItem style={{ flex: 1, flexDirection: 'row' }}>
                    <Left style={{ flex: 8 }}>
                        <Thumbnail style={styles.eventLogo} square source={require('../resources/images/50years.png')} />
                        <Body>
                            <Text>{title}</Text>
                            <Text note>{dateEvent.format('DD MMMM YYYY')}</Text>
                        </Body>
                    </Left>
                    {/* <Right style={{ flex: 1 }}>
                            <Menu
                                ref={this.setMenuRef}
                                button={
                                    <Button transparent style={styles.buttonMoreMenu} full large dark onPress={this.showMenu}>
                                        <Icon name='md-more' />
                                    </Button>
                                }
                            >
                                <MenuItem onPress={() => this.menuItemAction('edit')}>Edit</MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={() => this.menuItemAction('remove')}>Remove</MenuItem>
                            </Menu>
                        </Right> */}
                </CardItem>
                <CardItem cardBody>
                    {(imgUri != null)
                        ? <Image style={styles.eventImage} source={{ uri: imgUri }} />
                        : <Image style={styles.eventImage} source={require('../resources/images/no-image-available.jpg')} />}
                </CardItem>
                <CardItem cardBody>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Button full transparent success onPress={() => this.onPressSchedule(eventID, title)}>
                                <Icon name='md-time' />
                                <Text style={styles.textRegisterButton}>Schedule</Text>
                            </Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button full transparent info onPress={() => this.onPressAttendees(eventID, title)}>
                                <Icon name='md-people' />
                                <Text style={styles.textRegisterButton}>Attendees</Text>
                            </Button>
                        </View>
                    </View>
                </CardItem>
            </Card>
            //</Content>
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
        padding: 2
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
export default EventBox;
