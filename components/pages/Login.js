//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, AsyncStorage } from 'react-native';
import { Text, Footer, FooterTab } from 'native-base'
import PSUPassport from '../../apis/psuPassport'
import { connect } from 'react-redux'
import { userDetailToStore } from '../../store/actions/userDetail'
import { Actions } from 'react-native-router-flux'
import { USERNAME, PASSWORD } from 'react-native-dotenv'

// create a component
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            disabledLoginButton: false
        }
    }

    onSubmit = async () => {
        this.setState({
            isLoading: true,
            disabledLoginButton: true
        })
        Keyboard.dismiss()
        await PSUPassport.GetUserDetails(this.state.username, this.state.password).then(Result => {
            AsyncStorage.setItem('LoggedIn', 'true')
            AsyncStorage.setItem('userDetail', JSON.stringify(Result.GetUserDetailsResult[0].string))
            this.props.userDetailToStore(Result.GetUserDetailsResult[0].string)
            //console.log(Result.GetUserDetailsResult[0].string)
            this.setState({
                isLoading: false,
                disabledLoginButton: false
            })
            Actions.main()
        }).catch(err => {
            this.setState({
                isLoading: false,
                disabledLoginButton: false
            })
            alert('Sorry wrong Username or Password')
        })
    }

    async componentDidMount() {
        const LoggedIn = await AsyncStorage.getItem('LoggedIn')

        if (LoggedIn === 'true') {
            const userDetail = await AsyncStorage.getItem('userDetail')
            this.props.userDetailToStore(JSON.parse(userDetail))
            Actions.main()
        }
    }

    render() {

        const { disabledLoginButton } = this.state

        return (
            <View style={styles.container}>
                <View style={styles.viewLogo}>
                    <Image style={styles.logo} source={require('../../resources/images/50years.png')} />
                    <Text style={styles.systemNane}>Time Attendance</Text>

                </View>
                <View style={{ flex: 2 }}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        placeholder='PSU Passport'
                        onChangeText={(username) => this.setState({ username })}
                    />
                    <TextInput
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })} />
                    {this.state.isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />)}
                    <TouchableOpacity disabled={disabledLoginButton} activeOpacity={!disabledLoginButton ? 1 : 0.5} style={styles.buttonContainer} onPress={this.onSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Footer style={styles.footer}>
                    <Text note style={styles.footerText}>Prince of Songkla University Phuket Campus</Text>
                </Footer>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    viewLogo: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    logo: {
        width: 100,
        height: 100,
    },
    systemNane: {
        paddingTop: 20,
        fontSize: 16,
        color: '#2E2E2E'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,1)',
        marginBottom: 10,
        padding: 10,
        color: '#000'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    footer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#FFFFFF',
        elevation: 0
    },
    footerText: {
        paddingTop: 30
    },
    ActivityIndicator: {
        paddingTop: 20,
        paddingBottom: 20
    }
});

//make this component available to the app
export default connect(null, { userDetailToStore })(Login);
