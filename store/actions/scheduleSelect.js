import { SCHEDULE_SELECT } from '../type'

export const scheduleSelect = data => ({
    type: SCHEDULE_SELECT,
    data
})

export const scheduleSelectToStore = (data) => (dispatch) => {
    dispatch(scheduleSelect(data))
}