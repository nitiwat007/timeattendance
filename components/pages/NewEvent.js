//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Form, Input, Item, Label, Switch } from 'native-base'
import DatePicker from 'react-native-datepicker'

import AppHeaderBack from '../Headers/AppHeaderBack'

// create a component
class NewEvent extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <AppHeaderBack title='สร้างกิจกรรม' />
                <Content>
                    <Form style={styles.form}>
                        <Label>ชื่อกิจกรรม</Label>
                        <Item regular style={styles.formItem}>
                            <Input />
                        </Item>
                        <Label>ชื่อย่อกิจกรรม</Label>
                        <Item regular style={styles.formItem}>
                            <Input />
                        </Item>
                        <Label>วันที่จัดกิจกรรม</Label>
                        <View  style={styles.formItem}>
                            <DatePicker
                                style={styles.datePicker}
                                mode='date'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput:{
                                        borderColor: '#E6E6E6'
                                    }
                                }}
                            />
                        </View>
                        <Label>สถานที่จัดกิจกรรม</Label>
                        <Item regular style={styles.formItem}>
                            <Input />
                        </Item>
                        <Label>รายละเอียดกิจกรรม</Label>
                        <Item regular style={styles.formItem}>
                            <Input style={styles.inputMultiline} multiline={true} numberOfLines={5} />
                        </Item>
                        <View style={styles.viewInline}>
                            <View style={styles.viewLabelInline}>
                                <Label>สถานะกิจกรรม</Label>
                            </View>
                            <View>
                                <Switch />
                            </View>
                        </View>
                        <View style={styles.viewInline}>
                            <View style={styles.viewLabelInline}>
                                <Label>ลงทะเบียนหน้างาน</Label>
                            </View>
                            <View>
                                <Switch />
                            </View>
                        </View>
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
        backgroundColor: '#FFFFFF',
    },
    form: {
        padding: 10
    },
    formItem: {
        marginBottom: 15,
    },
    inputMultiline: {
        height: 150
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
        
    }
});

//make this component available to the app
export default NewEvent;
