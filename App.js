import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

import MainNavigator from './screens/MainNavigator'

import rootReducer from './redux/reducers/rootReducer'

firestore()

const middlewares = [thunk.withExtraArgument(getFirebase)]

const store = createStore(rootReducer, {},
	compose(
		applyMiddleware(...middlewares),
		reduxFirestore(firebase)
	)
)

const rrfProps = {
	firebase,
	config: {
		userProfile: 'users',
		useFirestoreForProfile: true,
	},
	dispatch: store.dispatch,
	createFirestoreInstance
}

class App extends Component {
	render()
	{
		return (
			<Provider store={store}>
				<ReactReduxFirebaseProvider {...rrfProps}>
					<MainNavigator />
				</ReactReduxFirebaseProvider>
			</Provider>
		);
	}
}

export default App
