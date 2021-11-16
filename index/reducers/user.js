import {
    GET_USERINFO,
    ADD_USERINFO
} from '../constants/ActionTypes'

const initialState = {
    user: {
    },
    token:""
}
const Userinfo = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERINFO:
            return {...state, ...action.user}
        case GET_USERINFO:
            return state
        default:
            return state
    }
}
export default Userinfo