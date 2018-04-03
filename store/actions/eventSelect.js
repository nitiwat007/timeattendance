import { EVENT_SELECT } from '../type'

export const eventSelect = data => ({
    type: EVENT_SELECT,
    data
})

export const eventSelectToStore = (data) => (dispatch) => {
    dispatch(eventSelect(data))
}