import { CURRENT_DOC } from '../actionCreators'

const initState = {
	id: null,
	process: null,
	title: null,
	isUpdate: false,
	img: null,
	content: '',
}

const docReducer = (state = initState, action) => {
	if (action.type === CURRENT_DOC)
	{
		return {
			...state,
			...action.payload,
		}
	}

	return state
}

export default docReducer
