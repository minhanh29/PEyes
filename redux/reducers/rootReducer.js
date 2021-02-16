import { combineReducers } from 'redux'
// import { firestoreReducer } from 'redux-firestore'

import authReducer from './authReducer'
import loadingReducer from './loadingReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	loading: loadingReducer,
	// firestore: firestoreReducer,
})

export default rootReducer
