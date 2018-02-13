import { USER_DETAIL } from '../type'

export default function userDetail(state = {}, action = {}) {
    switch (action.type) {
        case USER_DETAIL:
            return action.data
        default:
            return state
    }
}