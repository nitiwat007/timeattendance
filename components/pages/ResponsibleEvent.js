//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import EventApi from '../../apis/event'
import { connect } from 'react-redux';
import EventBox from '../EventBox'

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
                <AppHeaderBack title='Responsible Event' />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            title='loading data'
                        />
                    }
                >
                    <Content>
                        {isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                        {events.map((event, i) =>
                            <EventBox key={i} title={event.EventNameEN} date={event.EventDate} imgUri={event.EventBannerLink} eventID={event.EventID} />
                        )}
                    </Content>
                </ScrollView>
            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
