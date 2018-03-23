//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Switch, Button, Icon, Body, Left, Right, Thumbnail, List, ListItem } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import AttendeesApi from '../../apis/attendees'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';

// create a component
class Attendees extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attendees: [],
            attendeesSearch: [],
            isLoading: true,
            refreshing: true
        }
    }

    componentDidMount() {
        const { EventID, EventName } = this.props
        const memberID = this.props.userDetail[0]
        AttendeesApi.getAttendees(memberID, EventID)
            .then(data => {
                this.setState({
                    attendees: data,
                    attendeesSearch: data,
                    isLoading: false,
                    refreshing: false
                })
            }).catch(error => {
                if (error.response.status = 404) {
                    this.setState({
                        isLoading: false,
                        refreshing: false
                    })
                } else {
                    alert(error.response.data.Message)
                    this.setState({
                        isLoading: false,
                        refreshing: false
                    })
                }
            })
    }

    onRefresh = () => {
        this.setState({
            attendees: [],
            attendeesSearch: []
        })
        const memberID = this.props.userDetail[0]
        const { EventID } = this.props
        AttendeesApi.getAttendees(memberID, EventID).then(data => {
            this.setState({
                isLoading: false,
                attendees: data,
                attendeesSearch: data,
                refreshing: false
            })
        }).catch(error => {
            if (error.response.status = 404) {
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            } else {
                alert(error.response)
            }
        })
    }

    onSearch = (event) => {
        this.setState({
            attendees: this.state.attendeesSearch.filter(x => x.FullName.match(event))
        })
    }

    render() {
        const { EventID, EventName } = this.props
        const { isLoading, attendees, refreshing } = this.state
        return (
            <Container style={styles.container}>
                <AppHeaderBack title='Attendees' component='attendees' eventid={EventID} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            title='loading data'
                        />
                    }
                >
                    <Content style={styles.content}>
                        <View style={styles.contentHeader}>
                            <View style={styles.iconContainer}>
                                <Icon style={{ color: '#62B1F6' }} name="md-people" />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.EventName}>{EventName}</Text>
                            </View>
                            <View style={styles.detailContainer2}>
                                <Text>{attendees.length} persons</Text>
                            </View>
                        </View>
                        <View>
                            <Item regular style={styles.formItemCode}>
                                <Input style={styles.inputText} onChangeText={this.onSearch} placeholder='Search by Name' />
                            </Item>
                            {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                            <List style={{ backgroundColor: '#FFFFFF', marginTop: 10 }}>
                                {attendees.sort((a, b) => a.Code < b.Code ? -1 : 0).map((attendee, i) =>
                                    <ListItem icon button onPress={() => Actions.attendeedetail({ Code: attendee.Code, FullName: attendee.FullName })}>
                                        {/* <ListItem icon> */}
                                        <Left>
                                            <Icon name='ios-contact-outline' />
                                        </Left>
                                        <Body>
                                            <Text>{attendee.FullName}</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="md-barcode" />
                                        </Right>
                                    </ListItem>
                                )}

                            </List>
                        </View>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingBottom: 10
    },
    contentHeader: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        padding: 10
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    detailContainer: {
        flex: 6,
        alignItems: 'flex-start',
        paddingTop: 5
    },
    detailContainer2: {
        flex: 2,
        alignItems: 'flex-start',
        marginTop: 8
    },
    EventName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    ActivityIndicator: {
        paddingTop: 20
    },
    formItemCode: {
        marginTop: 5,
    },
    inputText: {
        backgroundColor: '#FFFFFF'
    },
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(Attendees);
