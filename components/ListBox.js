//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Icon, Form, Input, Item, Label, Switch, Button, Card, CardItem, Left, Right, Body } from 'native-base'
import moment from 'moment'
import { connect } from 'react-redux'
import AttendanceApi from '../apis/attendance'

// create a component
class ListBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            isLoading: false
        }
    }

    onRemove = () => {
        this.setState({
            modalVisible: true
        })
    }

    onSelectRemoveAction = (removeAction) => {
        let { attendeeid, fullname, checkindatetime, checkinby, checkoutdatetime, checkoutby, action, typelistbox } = this.props

        Alert.alert(
            'Confirmation Remove',
            'Do you want to Remove ' + removeAction + ' data ?',
            [
                {
                    text: 'Cancel', onPress: () => {
                        console.log('Cancel Pressed')
                    }, style: 'cancel'
                },
                {
                    text: 'Ok', onPress: () => {
                        switch (removeAction) {
                            case 'CHECK IN':
                                this.removeCheckInAttendance()
                                break
                            case 'CHECK OUT':
                                this.removeCheckOutAttendance()
                                break
                        }

                    }
                }

            ],
            { cancelable: false }
        )
    }

    removeCheckOutAttendance = () => {
        this.setState({ isLoading: true })
        const memberID = this.props.userDetail[0]
        const { eventid, scheduleid, attendeeid, checkindatetime } = this.props
        AttendanceApi.deleteCheckOut(memberID, eventid, scheduleid, attendeeid)
            .then(data => {
                this.props.loadingdata()
                this.setState({
                    modalVisible: false,
                    isLoading: false
                })
            }).catch(error => {
                alert(error.response.data.Message)
            })
    }


    removeCheckInAttendance = () => {
        this.setState({ isLoading: true })
        const memberID = this.props.userDetail[0]
        const { eventid, scheduleid, attendeeid } = this.props

        AttendanceApi.deleteCheckIn(memberID, eventid, scheduleid, attendeeid)
            .then(data => {
                this.props.loadingdata()
                this.setState({
                    modalVisible: false,
                    isLoading: false
                })
            }).catch(error => {
                alert(error.response.data.Message)
            })
    }

    closeModal = () => {
        this.setState({
            modalVisible: false,
            isLoading: false
        })
    }
    render() {
        let { attendeeid, fullname, checkindatetime, checkinby, checkoutdatetime, checkoutby, action, typelistbox } = this.props
        return (
            <Content style={styles.content}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <Content style={styles.contentModal}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>SELECT REMOVE ACTION</Text>
                        </View>
                        <View>
                            <ListBox
                                fullname={fullname}
                                checkindatetime={checkindatetime}
                                checkinby={checkinby}
                                checkoutdatetime={checkoutdatetime}
                                checkoutby={checkoutby}
                                action={action}
                                typelistbox='showresult'
                            />
                            <View>
                                {this.state.isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Button style={{ marginTop: 10, marginRight: 10 }} full success onPress={() => this.onSelectRemoveAction('CHECK IN')}>
                                        <Text style={styles.textButtonSubmit}>REMOVE CHECK IN</Text>
                                    </Button>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button style={{ marginTop: 10, marginRight: 10 }} full danger onPress={() => this.onSelectRemoveAction('CHECK OUT')}>
                                        <Text style={styles.textButtonSubmit}>REMOVE CHECK OUT</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab style={{ backgroundColor: "#FFF" }}>
                            <Button full warning onPress={this.closeModal}>
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>CLOSE</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Modal>
                <Card style={styles.cardAttendance}>
                    <CardItem style={styles.cardItemFullname}>
                        <Left>
                            <Icon name="md-contact" />
                            <Body>
                                <Text>{fullname}</Text>
                            </Body>
                        </Left>
                        {(typelistbox === 'listresult') &&
                            <Right>
                                <Button iconLeft transparent danger onPress={() => this.onRemove(attendeeid)}>
                                    <Icon name='md-close-circle' />
                                </Button>
                            </Right>
                        }
                    </CardItem>
                    {(action === 'checkin') ?
                        <CardItem style={styles.cardItem}>
                            <Left>
                                <Body>
                                    <Text style={styles.textLabelCheckIn}>CKECKED IN  : <Text note>{(checkindatetime !== null) && moment(checkindatetime).format('DD MMMM YYYY HH:mm:ss')}</Text></Text>
                                    <Text style={styles.textLabelCheckBy}>CHECKED BY : <Text note>{checkinby}</Text></Text>
                                </Body>
                            </Left>
                        </CardItem>
                        : (action === 'checkout') ?
                            <CardItem style={styles.cardItem}>
                                <Left>
                                    <Body>
                                        <Text style={styles.textLabelCheckOut}>CKECKED OUT  : <Text note>{(checkoutdatetime !== null) && moment(checkoutdatetime).format('DD MMMM YYYY HH:mm:ss')}</Text></Text>
                                        <Text style={styles.textLabelCheckBy}>CHECKED BY : <Text note>{checkoutby}</Text></Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            : <View><CardItem style={styles.cardItem}>
                                <Left>
                                    <Body>
                                        <Text style={styles.textLabelCheckIn}>CKECKED IN  : <Text note>{(checkindatetime !== null) && moment(checkindatetime).format('DD MMMM YYYY HH:mm:ss')}</Text></Text>
                                        <Text style={styles.textLabelCheckBy}>CHECKED BY : <Text note>{checkinby}</Text></Text>
                                    </Body>
                                </Left>
                            </CardItem>
                                <CardItem style={styles.cardItem}>
                                    <Left>
                                        <Body>
                                            <Text style={styles.textLabelCheckOut}>CKECKED OUT  : <Text note>{(checkoutdatetime !== null) && moment(checkoutdatetime).format('DD MMMM YYYY HH:mm:ss')}</Text></Text>
                                            <Text style={styles.textLabelCheckBy}>CHECKED BY : <Text note>{checkoutby}</Text></Text>
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
    contentModal: {
        flex: 1,
        padding: 10,
        marginTop: 50
    },
    modalTitle: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: '#424242'
    },
    textButtonSubmit: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold'
    },
    ActivityIndicator: {
        padding: 20
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(ListBox);
