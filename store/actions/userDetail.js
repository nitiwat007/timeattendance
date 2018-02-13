import { USER_DETAIL } from '../type'

export const userDetail = data => ({
    type: USER_DETAIL,
    data
})

export const userDetailToStore = (data) => (dispatch) => {
    dispatch(userDetail(data))
}