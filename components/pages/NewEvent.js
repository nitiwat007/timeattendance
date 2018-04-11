//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Form, Input, Item, Label, Switch, Button, Icon, Body, Thumbnail } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { Permissions, ImagePicker } from 'expo'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import AppHeaderBack from '../Headers/AppHeaderBack'
import EventApi from '../../apis/event'
import EventBox from '../EventBox'

// create a component
class NewEvent extends Component {

    constructor(props) {
        super(props);
        const date = new Date()
        this.state = {
            BannerUrl: '',
            EventName: '',
            EventAcronym: '',
            EventLocationName: '',
            EventDate: '',
            EventDescription: '',
            EventStatusID: false,
            AllowWalkIn: false,
            ErrorEventName: false,
            ErrorEventAcronym: false,
            modalNewEventCompleteVisible: false
        }
    }

    onSubmit = () => {
        let { ErrorEventName, ErrorEventAcronym } = this.state
        const { EventName, EventAcronym } = this.state
        if (EventName == '') {
            this.setState({ ErrorEventName: true })
            this.inputEventName._root.focus()
        } else {
            this.setState({ ErrorEventName: false })
        }

        if (EventAcronym == '') {
            this.setState({ ErrorEventAcronym: true })
            this.inputEventAcronym._root.focus()
        } else {
            this.setState({ ErrorEventAcronym: false })
        }

        if (!ErrorEventName && !ErrorEventAcronym) {
            this.createEvent()
        }
    }

    createEvent = () => {
        const memberID = this.props.userDetail[0]
        let {
            EventName,
            EventAcronym,
            EventLocationName,
            EventDate,
            EventDescription,
            EventStatusID,
            AllowWalkIn,
            BannerUrl
        } = this.state

        const formData = new FormData()
        formData.append('EventNameEN', EventName)
        formData.append('EventAcronym', EventAcronym)
        formData.append('EventLocationNameEN', EventLocationName)
        formData.append('EventDate', EventDate)
        formData.append('EventDescription', EventDescription)

        { (EventStatusID == true) ? EventStatusID = 1 : EventStatusID = 0 }
        formData.append('EventStatusID', EventStatusID)

        formData.append('AllowWalkIn', AllowWalkIn)
        const uri = BannerUrl
        if (uri !== '') {
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('Banner', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            })
        }


        EventApi.createEvent(memberID, formData).then(response => {
            alert('Create Event Complete')
            Actions.main()
        }).catch(error => alert(error.response.data.Message))
    }

    pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1
        })
        this.handleImagePicked(pickerResult)
    }

    handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult
        try {
            if (!pickerResult.cancelled) {
                this.setState({
                    BannerUrl: pickerResult.uri
                })
            }
        } catch (e) {
            alert(e)
        } finally {
            //alert(this.state.BannerUrl)
        }
    }

    render() {

        const { BannerUrl, EventName, EventAcronym, EventLocationName, EventDate, EventDescription, EventStatusID, AllowWalkIn } = this.state
        const { ErrorEventName, ErrorEventAcronym } = this.state

        return (
            <Container style={styles.container}>
                <AppHeaderBack title='New Event' />
                <Content>
                    <Form style={styles.form}>
                        <Label>Title</Label>
                        <Item error={ErrorEventName} regular style={styles.formItem}>
                            <Input ref={(c) => this.inputEventName = c} style={styles.inputText} onChangeText={(EventName) => this.setState({ EventName })} />
                        </Item>
                        <Label>ชื่อย่อกิจกรรม</Label>
                        <Item error={ErrorEventAcronym} regular style={styles.formItem}>
                            <Input ref={(c) => this.inputEventAcronym = c} style={styles.inputText} onChangeText={(EventAcronym) => this.setState({ EventAcronym })} />
                        </Item>
                        <Label>วันที่จัดกิจกรรม</Label>
                        <View style={styles.formItem}>
                            <DatePicker
                                style={styles.datePicker}
                                date={EventDate}
                                mode='date'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Select Date"
                                customStyles={{
                                    dateInput: {
                                        borderColor: '#E6E6E6'
                                    },
                                    btnTextConfirm: {
                                        height: 20
                                    },
                                    btnTextCancel: {
                                        height: 20
                                    }
                                }}
                                onDateChange={(EventDate) => { this.setState({ EventDate }) }}
                            />
                        </View>
                        <Label>สถานที่จัดกิจกรรม</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputText} onChangeText={(EventLocationName) => this.setState({ EventLocationName })} />
                        </Item>
                        <Label>รายละเอียดกิจกรรม</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputMultiline} multiline={true} numberOfLines={8} onChangeText={(EventDescription) => this.setState({ EventDescription })} />
                        </Item>
                        <View style={styles.viewInline}>
                            <View style={styles.viewLabelInline}>
                                {(EventStatusID == false)
                                    ? <Label>สถานะกิจกรรม<Label style={styles.EventStatusInitail}>(กำลังสร้าง)</Label></Label>
                                    : <Label>สถานะกิจกรรม<Label style={styles.EventStatusOpen}>(เปิด)</Label></Label>}
                            </View>
                            <View>
                                <Switch onValueChange={(EventStatusID) => { this.setState({ EventStatusID }) }} value={EventStatusID} />
                            </View>
                        </View>
                        <View style={styles.viewInline}>
                            <View style={styles.viewLabelInline}>
                                {(AllowWalkIn == false)
                                    ? <Label>ลงทะเบียนหน้างาน<Label style={styles.AllowWalkInNo}>(ไม่อนุญาติ)</Label></Label>
                                    : <Label>ลงทะเบียนหน้างาน<Label style={styles.AllowWalkInYes}>(อนุญาติ)</Label></Label>}
                            </View>
                            <View>
                                <Switch onValueChange={(AllowWalkIn) => { this.setState({ AllowWalkIn }) }} value={AllowWalkIn} />
                            </View>
                        </View>
                        <View style={styles.viewBanner}>
                            <View style={styles.viewInlineBanner}>
                                <View style={styles.viewLabelInline}>
                                    <Label>แบนเนอร์</Label>
                                </View>
                                <View>
                                    <Button style={styles.buttonBrowsePicture} iconLeft onPress={this.pickImage}>
                                        <Icon name='ios-cloud-upload-outline' />
                                        <Body>
                                            <Text style={styles.textButtonBrowsePicture}>Browse..</Text>
                                        </Body>

                                    </Button>
                                </View>
                            </View>
                            <View>
                                {(BannerUrl == '')
                                    ? <Thumbnail style={styles.banner} square source={require('../../resources/images/no-image-available.jpg')} />
                                    : <Thumbnail style={styles.banner} square source={{ uri: BannerUrl }} />}
                            </View>
                        </View>
                        <Button block success style={styles.buttonSubmit} onPress={this.onSubmit}>
                            <Text style={styles.textButtonSubmit}>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F4F6F6',
    },
    form: {
        padding: 10
    },
    formItem: {
        marginBottom: 15,
    },
    inputText: {
        backgroundColor: '#FFFFFF'
    },
    inputMultiline: {
        height: 200,
        backgroundColor: '#FFFFFF'
    },
    viewBanner: {
        flex: 1,
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingBottom: 15,
        paddingTop: 15
    },
    viewInlineBanner: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
        paddingTop: 15,
    },
    viewInline: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingBottom: 15,
        paddingTop: 15
    },
    viewLabelInline: {
        flex: 1,
        alignItems: 'flex-start'
    },
    datePicker: {
        width: null,
        backgroundColor: '#FFFFFF'
    },
    buttonSubmit: {
        margin: 10,
        marginTop: 30
    },
    textButtonSubmit: {
        color: '#FFFFFF'
    },
    buttonBrowsePicture: {
        width: 150
    },
    textButtonBrowsePicture: {
        color: '#FFFFFF'
    },
    banner: {
        width: null,
        height: 350,
        flex: 1,
        marginTop: 15
    },
    EventStatusInitail: {
        color: 'blue'
    },
    EventStatusOpen: {
        color: 'green'
    },
    AllowWalkInNo: {
        color: 'red'
    },
    AllowWalkInYes: {
        color: 'green'
    }
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, null)(NewEvent);
