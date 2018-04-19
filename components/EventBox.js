//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, Modal, ActivityIndicator, Platform, Alert, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Text, Button, Icon, Header, Title, Form, Input, Item, Label, Switch, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { eventSelectToStore } from '../store/actions/eventSelect'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import { Permissions, ImagePicker } from 'expo'
import EventApi from '../apis/event'

// create a component
class EventBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            EventTitleEdit: this.props.EventInfo.EventNameEN,
            EventAcronymEdit: this.props.EventInfo.EventAcronym,
            EventDateEdit: this.props.EventInfo.EventDate,
            EventLocationNameEdit: this.props.EventInfo.EventLocationNameEN,
            EventDescriptionEdit: this.props.EventInfo.EventDescription,
            EventStatusIDEdit: (this.props.EventInfo.EventStatusID == 0 ? false : true),
            AllowWalkInEdit: this.props.EventInfo.AllowWalkIn,
            EventBannerLinkEdit: this.props.EventInfo.EventBannerLink,
            isLoading: false,
            disabledButtonSave: false,
            uploadNewBanner: false,
            errorMessage: ''
        }
    }

    showMenu = () => {
        this.setState({
            isModalVisible: true
        })
    }

    onClose = () => {
        this.setState({
            isModalVisible: false,
            EventTitleEdit: this.props.EventInfo.EventNameEN,
            EventAcronymEdit: this.props.EventInfo.EventAcronym,
            EventDateEdit: this.props.EventInfo.EventDate,
            EventLocationNameEdit: this.props.EventInfo.EventLocationNameEN,
            EventDescriptionEdit: this.props.EventInfo.EventDescription,
            EventStatusIDEdit: (this.props.EventInfo.EventStatusID == 0 ? false : true),
            AllowWalkInEdit: this.props.EventInfo.AllowWalkIn,
            EventBannerLinkEdit: this.props.EventInfo.EventBannerLink,
            isLoading: false,
            disabledButtonSave: false,
            uploadNewBanner: false,
            errorMessage: ''
        })
    }

    onPressSchedule = () => {
        this.props.eventSelectToStore(this.props.EventInfo)
        Actions.schedule()
    }

    onPressAttendees = () => {
        this.props.eventSelectToStore(this.props.EventInfo)
        Actions.attendees()
    }

    onEventDetail = () => {
        this.props.eventSelectToStore(this.props.EventInfo)
        Actions.eventdetail()
    }

    onSave = async () => {
        this.setState({
            isLoading: true,
            disabledButtonSave: true
        })
        const memberID = this.props.userDetail[0]
        let { EventTitleEdit, EventAcronymEdit, EventLocationNameEdit, EventDateEdit, EventDescriptionEdit, EventStatusIDEdit, AllowWalkInEdit, EventBannerLinkEdit, uploadNewBanner } = this.state
        const { EventInfo } = this.props
        const formData = new FormData()
        formData.append('EventNameEN', EventTitleEdit)
        formData.append('EventAcronym', EventAcronymEdit)
        formData.append('EventLocationNameEN', EventLocationNameEdit)
        formData.append('EventDate', EventDateEdit)
        formData.append('EventDescription', EventDescriptionEdit)
        { (EventStatusIDEdit == true) ? EventStatusIDEdit = 1 : EventStatusIDEdit = 0 }
        formData.append('EventStatusID', EventStatusIDEdit)

        formData.append('AllowWalkIn', AllowWalkInEdit)
        //console.log(EventBannerLinkEdit)
        if (uploadNewBanner) {
            const uri = EventBannerLinkEdit
            if (uri !== '') {
                let uriParts = uri.split('.');
                let fileType = uriParts[uriParts.length - 1];
                formData.append('Banner', {
                    uri,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                })
            }
        }

        await EventApi.updateEvent(memberID, EventInfo.EventID, formData).then(response => {
            this.onClose()
            this.props.EventRefresh()
        }).catch(error => {
            this.setState({
                isLoading: false,
                disabledButtonSave: false
            })
            console.log(error.response.data.Message)
            this.setState({
                errorMessage: error.response.data.Message
            })
        })

    }

    pickImage = async () => {
        this.setState({
            isModalVisible: false
        })
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
            this.setState({
                isModalVisible: true
            })
            if (!pickerResult.cancelled) {
                this.setState({
                    EventBannerLinkEdit: pickerResult.uri,
                    uploadNewBanner: true
                })
            }

        } catch (e) {
            alert(e)
        } finally {
            //alert(this.state.BannerUrl)
        }
    }

    render() {

        //const { title, date, imgUri, eventID, CreatedBy } = this.props
        const { EventInfo } = this.props
        const memberID = this.props.userDetail[0]
        const dateEvent = moment(EventInfo.EventDate)
        const { isModalVisible } = this.state
        const { errorMessage, EventTitleEdit, EventAcronymEdit, EventDateEdit, EventLocationNameEdit, EventDescriptionEdit, EventStatusIDEdit, AllowWalkInEdit, EventBannerLinkEdit } = this.state

        return (
            <Content>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={isModalVisible}>

                    <Header style={styles.headerModal}>
                        <Left>
                            <Button transparent large onPress={this.onClose}>
                                <Icon name='md-close' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ fontWeight: 'bold' }}>Edit Event</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>
                    <ScrollView>
                        <Content style={styles.contentModal}>
                            <Form style={styles.form}>
                                <Label>Title</Label>
                                <Item regular style={styles.formItem}>
                                    <Input style={styles.inputText} value={EventTitleEdit} onChangeText={(EventTitleEdit) => this.setState({ EventTitleEdit })} />
                                </Item>
                                <Label>EventAcronym</Label>
                                <Item regular style={styles.formItem}>
                                    <Input style={styles.inputText} value={EventAcronymEdit} onChangeText={(EventAcronymEdit) => this.setState({ EventAcronymEdit })} />
                                </Item>
                                <Label>วันที่จัดกิจกรรม</Label>
                                <View style={styles.formItem}>
                                    <DatePicker
                                        style={styles.datePicker}
                                        date={EventDateEdit}
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
                                        onDateChange={(EventDateEdit) => { this.setState({ EventDateEdit }) }}
                                    />
                                </View>
                                <Label>สถานที่จัดกิจกรรม</Label>
                                <Item regular style={styles.formItem}>
                                    <Input style={styles.inputText} value={EventLocationNameEdit} onChangeText={(EventLocationNameEdit) => this.setState({ EventLocationNameEdit })} />
                                </Item>
                                <Label>รายละเอียดกิจกรรม</Label>
                                <Item regular style={styles.formItem}>
                                    <Input style={styles.inputMultiline} value={EventDescriptionEdit} multiline={true} numberOfLines={8} onChangeText={(EventDescriptionEdit) => this.setState({ EventDescriptionEdit })} />
                                </Item>
                                <View style={styles.viewInline}>
                                    <View style={styles.viewLabelInline}>
                                        {(EventStatusIDEdit == false)
                                            ? <Label>สถานะกิจกรรม<Label style={styles.EventStatusInitail}>(กำลังสร้าง)</Label></Label>
                                            : <Label>สถานะกิจกรรม<Label style={styles.EventStatusOpen}>(เปิด)</Label></Label>}
                                    </View>
                                    <View>
                                        <Switch onValueChange={(EventStatusIDEdit) => { this.setState({ EventStatusIDEdit }) }} value={EventStatusIDEdit} />
                                    </View>
                                </View>
                                <View style={styles.viewInline}>
                                    <View style={styles.viewLabelInline}>
                                        {(AllowWalkInEdit == false)
                                            ? <Label>ลงทะเบียนหน้างาน<Label style={styles.AllowWalkInNo}>(ไม่อนุญาติ)</Label></Label>
                                            : <Label>ลงทะเบียนหน้างาน<Label style={styles.AllowWalkInYes}>(อนุญาติ)</Label></Label>}
                                    </View>
                                    <View>
                                        <Switch onValueChange={(AllowWalkInEdit) => { this.setState({ AllowWalkInEdit }) }} value={AllowWalkInEdit} />
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
                                    <View><Text ref='TextErrorMessage' style={{ color: 'red' }}>{errorMessage}</Text></View>
                                    <View>
                                        {(EventBannerLinkEdit == '')
                                            ? <Thumbnail style={styles.banner} square source={require('../resources/images/no-image-available.jpg')} />
                                            : <Thumbnail style={styles.banner} square source={{ uri: EventBannerLinkEdit }} />}
                                    </View>
                                </View>
                            </Form>
                        </Content>
                    </ScrollView>
                    <Footer>
                        <FooterTab style={{ backgroundColor: "#FFF" }}>
                            <Button disabled={this.state.disabledButtonSave} full success onPress={this.onSave}>
                                {(this.state.isLoading) ? (<ActivityIndicator style={styles.ActivityIndicator} size='large' color='#FFFFFF' />) : <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>SAVE</Text>}
                            </Button>
                        </FooterTab>
                    </Footer>
                </Modal>
                <Card>
                    {/* <CardItem style={{ flex: 1, flexDirection: 'row' }} button onPress={() => this.onEventDetail()}> */}
                    <CardItem style={{ flex: 1, flexDirection: 'row' }} >
                        <Left style={{ flex: 8 }}>
                            <Thumbnail style={styles.eventLogo} square source={require('../resources/images/50years.png')} />
                            <Body>
                                <Text>{EventInfo.EventNameEN}</Text>
                                <Text note>{dateEvent.format('DD MMMM YYYY')}</Text>
                            </Body>
                        </Left>
                        <Right style={{ flex: 1 }}>
                            {(memberID === EventInfo.CreatedBy) &&
                                <Button transparent style={styles.buttonMoreMenu} full large dark onPress={this.showMenu}>
                                    <Icon name='md-create' />
                                </Button>
                            }
                        </Right>
                    </CardItem>
                    {/* <CardItem cardBody button onPress={() => this.onEventDetail()}> */}
                    <CardItem cardBody >
                        {(EventInfo.EventBannerLink != null)
                            ? <Image style={styles.eventImage} source={{ uri: EventInfo.EventBannerLink }} />
                            : <Image style={styles.eventImage} source={require('../resources/images/no-image-available.jpg')} />}
                    </CardItem>
                    <CardItem cardBody>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Button full transparent onPress={() => this.onPressSchedule()}>
                                    <Icon name='md-time' style={{ color: '#178fd6' }} />
                                    <Text style={styles.textRegisterButton}>Schedules</Text>
                                </Button>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button full transparent info onPress={() => this.onPressAttendees()}>
                                    <Icon name='md-people' style={{ color: '#f9acbb' }} />
                                    <Text style={styles.textRegisterButton}>Attendees</Text>
                                </Button>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </Content>
        );

    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    eventImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 9 / 16,
        width: null,
        flex: 1,
    },
    eventLogo: {
        width: 45,
        height: 45,
    },
    eventContentBox: {
        padding: 5
    },
    textRegisterButton: {
        color: '#585858',
        fontWeight: 'bold'
    },
    buttonMoreMenu: {
        width: 30,
        height: 20
    },
    headerModal: {
        //marginTop: (Platform.OS === 'android') ? Expo.Constants.statusBarHeight : 0,
    },
    contentModal: {
        backgroundColor: '#F2F2F2'
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
    datePicker: {
        width: null,
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
    },
    buttonBrowsePicture: {
        width: 150
    },
    textButtonBrowsePicture: {
        color: '#FFFFFF'
    },
});

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

//make this component available to the app
export default connect(mapStateToProps, { eventSelectToStore })(EventBox);
