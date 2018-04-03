import { EVENT_SELECT } from '../type'

export default function eventSelect(state = {}, action = {}) {
    switch (action.type) {
        case EVENT_SELECT:
            return action.data
        default:
            return state
    }
}