import axios from 'axios'
import { APPLICATION_ID, TIME_ATTENDANCE_API_HOST } from 'react-native-dotenv'

const config = {
    headers: {
        'ApplicationID': APPLICATION_ID
    }
}

export default {
    getRegistrars: (memberID, EventID) =>
        axios.get(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/registrars', config).then(response => response.data)
}