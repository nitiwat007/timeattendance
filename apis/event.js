import axios from 'axios';
import { APPLICATION_ID, TIME_ATTENDANCE_API_HOST } from 'react-native-dotenv'

const config = {
    headers: {
        'ApplicationID': APPLICATION_ID
    }
}
const configMultipart = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'ApplicationID': APPLICATION_ID

    }
}

export default {
    getByMemberID: (memberID) =>
        axios.get(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events', config).then(response => response.data),
    createEvent: (memberID, formData) =>
        axios.post(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events', formData, configMultipart).then(response => response.data),
    getResponsible: (memberID) =>
        axios.get(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/responsible-events', config).then(response => response.data)
}