//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { Container, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base'
import AppHeaderBack from '../Headers/AppHeaderBack'
import { BarCodeScanner, Permissions } from 'expo';

// create a component
class RegisterAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            Registered: false
        }
    }

    componentDidMount() {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted'
        })
    }

    handleBarCodeRead = (result) => {
        //alert(result.data)
        let { Registered } = this.state
        if (!Registered) {
            this.setState({
                Registered: true
            })
            Alert.alert(
                'Confirm Registration',
                'Do you want to regist ID : ' + result.data,
                [
                    {
                        text: 'Ok', onPress: () => {
                            this.setState({
                                Registered: false
                            })
                        }
                    },
                    {
                        text: 'Cancel', onPress: () => {
                            this.setState({
                                Registered: false
                            })
                        }, style: 'cancel'
                    }
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        const { ScheduleID, ScheduleTitle } = this.props
        const { hasCameraPermission } = this.state
        return (
            <Container>
                <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
                    <View>
                        <AppHeaderBack title={ScheduleTitle} />
                        <Content>
                            {(hasCameraPermission === null)
                                ? <Text>Requesting for camera permission</Text>
                                : (hasCameraPermission === false)
                                    ? <Text style={{ color: '#fff' }}>Camera permission is not granted</Text>
                                    : <BarCodeScanner
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
                    <FooterTab>
                        <Button vertical active>
                            <Icon name="md-qr-scanner" />
                            <Text>QR Code</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="md-document" />
                            <Text>Form</Text>
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
});

//make this component available to the app
export default RegisterAttendance;
