import axios from 'axios';
import { APPLICATION_ID, EVENT_API_HOST } from 'react-native-dotenv'

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
        axios.get(EVENT_API_HOST + '/api/' + memberID + '/events', config).then(response => response.data),
    createEvent: (memberID, formData) =>
        axios.post(EVENT_API_HOST + '/api/' + memberID + '/events', formData, configMultipart).then(response => response.data)
}