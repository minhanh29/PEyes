import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

import ChildNavigator from './dashboard/ChildNavigator'
import AuthNavigator from './auth/AuthNavigator'
import { updateUID } from '../redux/actionCreators'

const Stack = createStackNavigator();

const MainNavigator = (props) => {
	const { auth } = props;
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{auth.isLoaded && !auth.isEmpty ? (
				// { true (
					<Stack.Screen name="Child" component={ChildNavigator} />
				) : (
					<Stack.Screen name="Auth" component={AuthNavigator} />

				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	firebase: state.firebase
})

export default connect(mapStateToProps)(MainNavigator)
