import axios from 'axios'
import { APPLICATION_ID, TIME_ATTENDANCE_API_HOST } from 'react-native-dotenv'

const config = {
    headers: {
        'ApplicationID': APPLICATION_ID
    }
}

export default {
    getAttendeesByID: (memberID, EventID, attendeeID) =>
        axios.get(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/attendees?code=' + attendeeID, config).then(response => response.data),
}