//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import EventApi from '../../apis/event'
import { connect } from 'react-redux';
import EventBox from '../EventBox'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

// create a component
class ResponsibleEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            isLoading: true,
            refreshing: false
        }
    }

    onRefresh() {
        this.setState({
            events: []
        })
        const memberID = this.props.userDetail[0]
        this.setState({ refreshing: true })
        EventApi.getResponsible(memberID).then(data => {
            this.setState({
                events: data,
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
                alert(error.response.status)
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            }
        })
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        const memberID = this.props.userDetail[0]

        EventApi.getResponsible(memberID).then(data => {
            this.setState({
                events: data,
                isLoading: false
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

    render() {

        const { events, isLoading, refreshing } = this.state

        return (
            <Container style={styles.container}>
                <AppHeaderBack title='Responsible Events' />
                <ScrollView
                    ref='scrollView'
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            title='loading data'
                        />
                    }
                >
                    <Content style={{ padding: 5 }}>
                        {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                        {(events.sort((a, b) =>
                            (moment.duration(moment(a.EventDate).add(1, 'days').diff(moment(new Date()).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))) < 0 ? 0 : 1)
                                >
                                (moment.duration(moment(b.EventDate).add(1, 'days').diff(moment(new Date()).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))) < 0 ? 0 : 1)
                                ? -1 : 0)
                            .map((event, i) =>
                                <EventBox
                                    key={i}
                                    EventInfo={event} />
                            ))}
                    </Content>
                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button vertical onPress={() => Actions.main()}>
                            <Icon name="md-home" />
                            <Text>My Events</Text>
                        </Button>
                        {/* <Button vertical active onPress={() => Actions.responsibleevent()}> */}
                        <Button vertical active onPress={() => this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true })}>
                            <Icon name="md-browsers" />
                            <Text>Responsible Events</Text>
                        </Button>
                    </FooterTab>

                </Footer>
            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    ActivityIndicator: {
        paddingTop: 20
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(ResponsibleEvent);
