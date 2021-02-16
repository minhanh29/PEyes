import { LOGIN, UID } from '../actionCreators'

const initState = {
	username: null,
	password: null,
	uid: null,
}

const authReducer = (state = initState, action) => {
	if (action.type === LOGIN)
	{
		return {
			...state,
			...action.payload
		}
	}

	return state
}

export default authReducer
