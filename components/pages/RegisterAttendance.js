//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base'
import AppHeaderHome from '../Headers/AppHeaderHome'
import { BarCodeScanner, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

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
        //console.log(this.props.scheduleSelect)
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
        const { ScheduleID, ScheduleTitle, EventID, scheduleSelect } = this.props
        let { Registered } = this.state
        if (!Registered) {
            this.setState({
                Registered: true
            })
            Actions.reset('registattendanceform', { ID: result.data })
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
        const { ScheduleID, ScheduleTitle, EventID, scheduleSelect } = this.props
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
                        <Button vertical full onPress={() => Actions.reset('registattendanceform')}>
                            <Icon name="md-document" />
                            <Text>Form</Text>
                        </Button>
                        <Button vertical full active onPress={() => Actions.reset('registattendance')}>
                            <Icon name="md-qr-scanner" />
                            <Text>Scan</Text>
                        </Button>
                        <Button vertical full onPress={() => Actions.reset('registattendancelist')}>
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

function mapStateToProps(state) {
    return {
        scheduleSelect: state.scheduleSelect
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(RegisterAttendance);
