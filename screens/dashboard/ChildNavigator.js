import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from './Dashboard'
import Preview from '../camera/Preview/Preview'
import Saving from '../camera/Saving/Saving'

const Stack = createStackNavigator()

const ChildNavigator = () => (
	<Stack.Navigator screenOptions={{
		headerShown: true,
		headerTintColor: 'black',
		headerStyle: {
			backgroundColor: 'white',
		},
	}}
		initialRouteName="Dashboard"
	>
		<Stack.Screen name="Dashboard" component={Dashboard}
			options={{ headerShown: false, }}
		/>
		<Stack.Screen
			name="Preview"
			component={Preview}
			options={{ headerTitle: 'Text Preview' }}
		/>
		<Stack.Screen name="Saving" component={Saving} />
	</Stack.Navigator>
)

export default ChildNavigator
