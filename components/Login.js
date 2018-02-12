//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

// create a component
class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewLogo}>
                    <Image style={styles.logo} source={require('../resources/images/psulogo.png')} />
                    <Text style={styles.systemNane}>Time Attendance</Text>
                </View>
                <View style={{ flex: 2 }}>

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
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    viewLogo: {
        flex: 1,
        alignItems: 'center',
        paddingTop:50
    },
    logo: {
        width: 55,
        height: 105,
    },
    systemNane: {
        paddingTop: 20,
        color: '#000000'
    }
});

//make this component available to the app
export default Login;
