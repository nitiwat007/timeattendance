import { SCHEDULE_SELECT } from '../type'

export default function scheduleSelect(state = {}, action = {}) {
    switch (action.type) {
        case SCHEDULE_SELECT:
            return action.data
        default:
            return state
    }
}