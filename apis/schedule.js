import axios from 'axios'
import { APPLICATION_ID, TIME_ATTENDANCE_API_HOST } from 'react-native-dotenv'

const config = {
    headers: {
        'ApplicationID': APPLICATION_ID,
        'Content-Type': 'application/json'
    }
}

export default {
    getScheduleByEventID: (memberID, EventID) =>
        axios.get(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/schedules', config).then(response => response.data),
    createSchedule: (memberID, EventID, data) =>
        axios.post(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/schedules', data, config).then(response => response.data),
}