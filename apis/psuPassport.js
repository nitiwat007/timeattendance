import soap from 'soap-everywhere'

const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl'

export default {
    Authenticate: (username, password) => {
        return new Promise((resolve, reject) => {
            const credentials = { username, password }
            soap.createClient(url, (err, client) => {
                client.Authenticate(credentials, (err, result) => {
                    if (err) return resolve(err)
                    return resolve(result)
                })
            })
        })
    },
    GetStaffDetails: (username, password) => {
        return new Promise((resolve, reject) => {
            const credentials = { username, password }
            soap.createClient(url, (err, client) => {
                client.GetStaffDetails(credentials, (err, result) => {
                    if (err) return resolve(err)
                    return resolve(result)
                })
            })
        })
    },
    GetStaffID: (username, password) => {
        return new Promise((resolve, reject) => {
            const credentials = { username, password }
            soap.createClient(url, (err, client) => {
                client.GetStaffID(credentials, (err, result) => {
                    if (err) return resolve(err)
                    return resolve(result)
                })
            })
        })
    },
    GetStudentDetails: (username, password) => {
        return new Promise((resolve, reject) => {
            const credentials = { username, password }
            soap.createClient(url, (err, client) => {
                client.GetStudentDetails(credentials, (err, result) => {
                    if (err) return resolve(err)
                    return resolve(result)
                })
            })
        })
    },
    GetUserDetails: (username, password) => {
        return new Promise((resolve, reject) => {
            const credentials = { username, password }
            soap.createClient(url, (err, client) => {
                client.GetUserDetails(credentials, (err, result) => {
                    if (err) return resolve(err)
                    return resolve(result)
                })
            })
        })
    }
}