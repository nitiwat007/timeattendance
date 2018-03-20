//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button, Alert, Card, CardItem, Left, Right, Body } from 'native-base'

// create a component
class ListBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }
    render() {
        const { fullname, checkindatetime, checkinby, checkoutdatetime, checkoutby, action } = this.props
        return (
            <Content style={styles.content}>
                <Card style={styles.cardAttendance}>
                    <CardItem style={styles.cardItemFullname}>
                        <Left>
                            <Icon name="md-contact" />
                            <Body>
                                <Text>{fullname}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    {(action === 'checkin') ?
                        <CardItem style={styles.cardItem}>
                            <Left>
                                <Body>
                                    <Text style={styles.textLabelCheckIn}>Checked In  : <Text note>{checkindatetime}</Text></Text>
                                    <Text style={styles.textLabelCheckBy}>Checked By : <Text note>{checkinby}</Text></Text>
                                </Body>
                            </Left>
                        </CardItem>
                        : (action === 'checkout') ?
                            <CardItem style={styles.cardItem}>
                                <Left>
                                    <Body>
                                        <Text style={styles.textLabelCheckOut}>Checked Out  : <Text note>{checkoutdatetime}</Text></Text>
                                        <Text style={styles.textLabelCheckBy}>Checked By : <Text note>{checkoutby}</Text></Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            : <View><CardItem style={styles.cardItem}>
                                <Left>
                                    <Body>
                                        <Text style={styles.textLabelCheckIn}>Checked In  : <Text note>{checkindatetime}</Text></Text>
                                        <Text style={styles.textLabelCheckBy}>Checked By : <Text note>{checkinby}</Text></Text>
                                    </Body>
                                </Left>
                            </CardItem>
                                <CardItem style={styles.cardItem}>
                                    <Left>
                                        <Body>
                                            <Text style={styles.textLabelCheckOut}>Checked Out  : <Text note>{checkoutdatetime}</Text></Text>
                                            <Text style={styles.textLabelCheckBy}>Checked By : <Text note>{checkoutby}</Text></Text>
                                        </Body>
                                    </Left>
                                </CardItem></View>}
                </Card>
            </Content>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    content: {

    },
    card: {
        marginBottom: 10
    },
    cardItem: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    cardItemFullname: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        backgroundColor: '#FAFAFA'
    },
    textLabelCheckIn: {
        color: 'green'
    },
    textLabelCheckOut: {
        color: 'red'
    },
    textLabelCheckBy: {
        color: '#2E86C1'
    },
});

//make this component available to the app
export default ListBox;
