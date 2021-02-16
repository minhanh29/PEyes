import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { reduxFirestore, createFirestoreInstance, getFirestore } from 'redux-firestore'
// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'

import MainNavigator from './screens/MainNavigator'

import rootReducer from './redux/reducers/rootReducer'

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

class App extends Component {
	state = {
		image: null,
	}

	handleImage = (image) => {
		this.setState({image})
	}

	render()
	{
		return (
			<Provider store={store}>
				<MainNavigator />
			</Provider>
		);
	}
}

export default App
