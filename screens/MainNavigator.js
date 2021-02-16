import React, { Component, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'

import ChildNavigator from './dashboard/ChildNavigator'
import AuthNavigator from './auth/AuthNavigator'
import { updateUID } from '../redux/actionCreators'

const Stack = createStackNavigator();

class MainNavigator extends Component {
	state = {
		isLoggedIn: false,
		subscriber: ()=> {},
	}

	onAuthStateChanged = (user) => {
		this.setState({
			isLoggedIn: user != null,
		})

		if (user)
			this.props.dispatch(updateUID(user.uid))
		console.log('Authentication', user)
		console.log('auth', this.props.auth)
	}

	componentDidMount() {
		const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
		this.setState({ subscriber })
	}

	componentWillUnmount() {
		// unsubscribe
		this.state.subscriber()
	}

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					{true ? (
					// {this.state.isLoggedIn ?(
						<Stack.Screen name="Child" component={ChildNavigator} />
					) : (
						<Stack.Screen name="Auth" component={AuthNavigator} />

					)}
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps)(MainNavigator)
