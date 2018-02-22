//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

// create a component
class EventBox extends Component {

    onPress = (eventID, title) => {
        Actions.schedule({ EventID: eventID, EventName: title })
    }

    setMenuRef = ref => {
        this.menu = ref;
    };

    menu = null;

    menuItemAction = (action) => {
        if (action === 'edit') {
            Actions.schedule()
            this.menu.hide()
        } else if (action === 'remove') {
            this.menu.hide()
        }

    };

    showMenu = () => {
        this.menu.show();
    };

    render() {

        const { title, date, imgUri, eventID } = this.props
        let dateEvent = new Date(date)

        return (
            <Content style={styles.eventContentBox}>
                <Card>
                    <CardItem style={{ flex: 1, flexDirection: 'row' }}>
                        <Left style={{ flex: 8 }}>
                            <Thumbnail style={styles.eventLogo} square source={require('../resources/images/psulogo.png')} />
                            <Body>
                                <Text>{title}</Text>
                                <Text note>{dateEvent.toDateString()}</Text>
                            </Body>
                        </Left>
                        <Right style={{ flex: 1 }}>
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
                                {/* <MenuItem onPress={this.menuItemAction} disabled>
                                    Test 3
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={this.hideMenu}>Test 4</MenuItem> */}
                            </Menu>
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
    },
    buttonMoreMenu: {
        width: 30
    }
});

//make this component available to the app
export default EventBox;
