import { combineReducers } from 'redux'
import userDetail from './reducers/userDetail'
import eventSelect from './reducers/eventSelect'
import scheduleSelect from './reducers/scheduleSelect'

export default combineReducers({
    userDetail,
    eventSelect,
    scheduleSelect
})