//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
// create a component
class ScheduleBox extends Component {

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

    onPress = (ScheduleID, ScheduleTitle, EventID) => {
        Actions.registattendance({ ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle, EventID: EventID })
    }

    render() {

        const { ScheduleTitle, ScheduleFrom, ScheduleTo, ScheduleNote, ScheduleID, EventID } = this.props
        let ScheduleDateTo, ScheduleDateFrom, ScheduleDateTimeTo, ScheduleDateTimeFrom
        try {
            ScheduleDateFrom = ScheduleFrom.split('T')[0]
            ScheduleDateTo = ScheduleTo.split('T')[0]
            ScheduleDateTimeFrom = ScheduleFrom.split('T')[1]
            ScheduleDateTimeTo = ScheduleTo.split('T')[1]
        } catch (error) {
            alert(error)
        }


        return (
            <Content style={styles.scheduleContentBox}>
                <Card>
                    <CardItem style={styles.scheduleTitleItem}>
                        <Left style={{ flex: 8 }}>
                            <Body >
                                <Text style={styles.titleText}>{ScheduleTitle}</Text>
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
                    <CardItem style={styles.scheduleDateTimeItem}>
                        <Left>
                            <Body>
                                <Text>Date : <Text note>{ScheduleDateFrom}</Text> - <Text note>{ScheduleDateTo}</Text></Text>
                                <Text>Time : <Text note>{ScheduleDateTimeFrom}</Text> - <Text note>{ScheduleDateTimeTo}</Text></Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem style={styles.scheduleNoteItem}>
                        <Left>
                            <Body>
                                <Text>Note</Text>
                                <Text note>
                                    {ScheduleNote}
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={styles.scheduleSelectItem}>
                        <Body>
                            <Button full success onPress={() => this.onPress(ScheduleID, ScheduleTitle, EventID)}>
                                <Text style={styles.textRegisterButton}>Select</Text>
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
        backgroundColor: '#2c3e50',
    },
    scheduleContentBox: {
        padding: 5
    },
    scheduleTitleItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingTop: 25,
        paddingBottom: 25,
        flex: 1,
        flexDirection: 'row'
    },
    scheduleDateTimeItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    scheduleNoteItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    buttonMoreMenu: {
        width: 30,
        height: 20
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E86C1'
    },
    textRegisterButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});

//make this component available to the app
export default ScheduleBox;
