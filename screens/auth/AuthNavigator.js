import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LogIn from './LogIn'
import SignUp from './SignUp'

const Stack = createStackNavigator()

const AuthNavigator = () => (
	<Stack.Navigator screenOptions={{
		headerShown: false,
		}}
		initialRouteName="LogIn"
	>
		<Stack.Screen name="LogIn" component={LogIn} />
		<Stack.Screen name="SignUp" component={SignUp} />
	</Stack.Navigator>
)

export default AuthNavigator
