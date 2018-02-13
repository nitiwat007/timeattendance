//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import PSUPassport from '../apis/psuPassport'
import { connect } from 'react-redux'
import { userDetailToStore } from '../store/actions/userDetail'
import { Actions } from 'react-native-router-flux'
import { USERNAME, PASSWORD } from 'react-native-dotenv'

// create a component
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: USERNAME,
            password: PASSWORD
        }
    }

    onSubmit = async () => {
        await PSUPassport.GetUserDetails(this.state.username, this.state.password).then(Result => {
            this.props.userDetailToStore(Result.GetUserDetailsResult[0].string)
            //console.log(Result.GetUserDetailsResult[0].string)
            Actions.main()
        }).catch(err => alert('Sorry wrong Username or Password'))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewLogo}>
                    <Image style={styles.logo} source={require('../resources/images/psulogo.png')} />
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

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
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
        width: 55,
        height: 105,
    },
    systemNane: {
        paddingTop: 20,
        color: '#000000'
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
    }
});

//make this component available to the app
export default connect(null, { userDetailToStore })(Login);
