import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import loadingReducer from './loadingReducer'

const rootReducer = combineReducers({
	loading: loadingReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
})

export default rootReducer
