//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Body, Left, Right, Title, Content, List, ListItem, Text, Icon, Footer, FooterTab, Button } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { userDetailToStore } from '../store/actions/userDetail'
// create a component
class SideBar extends Component {

    Logout = async () => {
        await AsyncStorage.setItem('LoggedIn', 'false')
        this.props.userDetailToStore(null)
        Actions.login()
    }

    onPress = (key) => {
        switch (key) {
            case 'myevent':
                this.props.closeDrawer()
                break
            case 'myeventrespons':
                this.props.closeDrawer()
                Actions.responsibleevent()
                break
            default: null
        }
    }

    render() {

        const { userDetail } = this.props
        let fullname = ''
        let username = ''
        let organization = ''
        if (userDetail == null) {

        } else {
            fullname = userDetail[1] + ' ' + userDetail[2]
            username = userDetail[0]
            organization = userDetail[8].split(' ')[0]
        }

        return (
            <Container style={styles.container}>
                <Header>
                    <Body style={styles.headerBody}>
                        <Title style={styles.headerTitle}>Account</Title>
                    </Body>
                </Header>
                <Content>
                    <Header style={styles.contentHeader}>
                        <View style={styles.iconContainer}>
                            <Icon name="md-happy" />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text>{fullname}</Text>
                            <Text note>{organization}</Text>
                        </View>
                    </Header>
                    <List>
                        <ListItem icon button onPress={(this.onPress.bind(this, 'myevent'))}>
                            <Left>
                                <Icon name="md-home" />
                            </Left>
                            <Body>
                                <Text>My Events</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon button onPress={(this.onPress.bind(this, 'myeventrespons'))}>
                            <Left>
                                <Icon name="md-browsers" />
                            </Left>
                            <Body>
                                <Text>Responsible Events</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
                <Footer style={styles.footerContainer}>
                    <FooterTab style={styles.logout}>
                        <Button onPress={() => this.Logout()}>
                            <Text style={styles.buttonLogout}>
                                LOGOUT
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    contentHeader: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    detailContainer: {
        flex: 6,
        alignItems: 'flex-start'
    },
    footerContainer: {
        backgroundColor: '#FFFFFF',
    },
    iconFooterContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    logout: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FE2E2E',
    },
    buttonLogout: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, { userDetailToStore })(SideBar);
