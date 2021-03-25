import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import loadingReducer from './loadingReducer'
import docReducer from './docReducer'

const rootReducer = combineReducers({
	loading: loadingReducer,
	doc: docReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
})

export default rootReducer
