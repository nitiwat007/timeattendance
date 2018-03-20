//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { BarCodeScanner, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux'

// create a component
class RegisterAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            Registered: false,
            isLoading: true
        }
    }

    componentDidMount() {
        try {
            // setTimeout(() => {
            //     this.requestCameraPermission()
            // }, 0);
            this.requestCameraPermission()
        } catch (error) {
            alert(error)
        }
    }

    requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted',
            isLoading: false
        })
    }

    handleBarCodeRead = (result) => {
        //alert(result.type)
        const { ScheduleID, ScheduleTitle, EventID } = this.props
        let { Registered } = this.state
        if (!Registered) {
            this.setState({
                Registered: true
            })
            Actions.registattendanceform({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle, ID: result.data })
            // Alert.alert(
            //     'Confirm Registration',
            //     'Do you want to regist ID : ' + result.data,
            //     [
            //         {
            //             text: 'Ok', onPress: () => {
            //                 this.setState({
            //                     Registered: false
            //                 })
            //                 Actions.registattendanceform({ EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle, ID: result.data })
            //             }
            //         },
            //         {
            //             text: 'Cancel', onPress: () => {
            //                 this.setState({
            //                     Registered: false
            //                 })
            //             }, style: 'cancel'
            //         }
            //     ],
            //     { cancelable: false }
            // )
        }
    }

    render() {
        const { ScheduleID, ScheduleTitle, EventID } = this.props
        const { hasCameraPermission, isLoading } = this.state
        return (
            <Container>
                <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
                    <View>
                        <AppHeaderHome title={ScheduleTitle} />
                        <Content>
                            {(hasCameraPermission === null)
                                ? (isLoading && (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#5DADE2' />))
                                : (hasCameraPermission === false)
                                    ? <Text style={{ color: '#fff' }}>Camera permission is not granted</Text>
                                    : < BarCodeScanner
                                        onBarCodeRead={this.handleBarCodeRead}
                                        style={{
                                            height: Dimensions.get('window').height,
                                            width: Dimensions.get('window').width,
                                        }}
                                    />
                            }
                        </Content>
                    </View>
                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button vertical onPress={() => Actions.reset('registattendanceform', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical active onPress={() => Actions.reset('registattendance', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-qr-scanner" />
                            <Text>Scan</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.reset('registattendancelist', { EventID: EventID, ScheduleID: ScheduleID, ScheduleTitle: ScheduleTitle })}>
                            <Icon name="md-people" />
                            <Text>List</Text>
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
        //backgroundColor: '#2c3e50',
    },
    ActivityIndicator: {
        paddingTop: 20
    }
});

//make this component available to the app
export default RegisterAttendance;
