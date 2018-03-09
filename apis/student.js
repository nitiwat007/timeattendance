import axios from 'axios'
import { STUDENT_INFO_API_TOKEN_URL, STUDENT_API_USERNAME, STUDENT_API_PASSWORD, STUDENT_INFO_API_URL } from 'react-native-dotenv'

const config = {
    headers: {
        'username': STUDENT_API_USERNAME,
        'password': STUDENT_API_PASSWORD
    }
}

export default {
    getStudentInfo: (StudentID) =>
        axios.get(STUDENT_INFO_API_TOKEN_URL, config).then(response => response.data.AccessToken).then(AccessToken => 
            axios.get(STUDENT_INFO_API_URL + '/sis/students/' + StudentID, { headers: { 'accessToken': AccessToken } }).then(response => response.data)
        )
}