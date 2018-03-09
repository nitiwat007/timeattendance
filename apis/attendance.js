import axios from 'axios'
import { APPLICATION_ID, TIME_ATTENDANCE_API_HOST } from 'react-native-dotenv'

const config = {
    headers: {
        'ApplicationID': APPLICATION_ID,
        'Content-Type': 'application/json'
    }
}

export default {
    checkIn: (memberID, EventID, ScheduleID, data) =>
        axios.post(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/schedules/' + ScheduleID + '/checkIn', data, config)
            .then(response => response.data),
    checkOut: (memberID, EventID, ScheduleID, data) =>
        axios.post(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/schedules/' + ScheduleID + '/checkOut', data, config)
            .then(response => response.data),
    getAttendances: (memberID, EventID, ScheduleID) =>
        axios.get(TIME_ATTENDANCE_API_HOST + '/api/' + memberID + '/events/' + EventID + '/schedules/' + ScheduleID + '/attendances', config)
            .then(response => response.data)
}