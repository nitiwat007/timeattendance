import axios from 'axios'
import {
    EMPLOYEE_INFO_API_TOKEN_URL,
    EMPLOYEE_API_USERNAME,
    EMPLOYEE_API_PASSWORD,
    EMPLOYEE_INFO_API_URL,
    ROLE_PROVIDER_GETUSER_API_URL
} from 'react-native-dotenv'

const config = {
    headers: {
        'username': EMPLOYEE_API_USERNAME,
        'password': EMPLOYEE_API_PASSWORD
    }
}

export default {
    getEmployeeInfo: (PassportUsername) =>
        axios.get(EMPLOYEE_INFO_API_TOKEN_URL, config).then(response => response.data.AccessToken).then(AccessToken =>
            axios.get(EMPLOYEE_INFO_API_URL + '/dss/employees?passport=' + PassportUsername, { headers: { 'AccessToken': AccessToken } })
                .then(response => response.data)
        ),
    getEmployeeByName: (name) =>
        axios.get(ROLE_PROVIDER_GETUSER_API_URL + name).then(response => response.data)
}
