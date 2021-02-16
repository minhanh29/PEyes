import { LOADING } from '../actionCreators'

const initState = {
	visible: false,
}

const loadingReducer = (state = initState, action) => {
	if (action.type === LOADING)
		return {
			...state,
			visible: action.payload,
		}

	return state
}

export default loadingReducer
