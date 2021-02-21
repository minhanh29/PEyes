import React from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { CommonActions } from '@react-navigation/native'
import Dashboard from './Dashboard'
import Preview from '../camera/Preview/Preview'
import Saving from '../camera/Saving/Saving'
import Cropper from '../camera/Cropper/Cropper'

const Stack = createStackNavigator()

const ChildNavigator = (props) => (
	<Stack.Navigator screenOptions={{
		headerShown: true,
		headerTintColor: 'rgba(255, 194, 57, 1)',
		headerStyle: {
			backgroundColor: 'rgba(29, 29, 45, 1)',
		},
	}}
		initialRouteName="Dashboard"
	>
		<Stack.Screen name="Dashboard" component={Dashboard}
			options={{ headerShown: false, }}
		/>
		<Stack.Screen
			name="Cropper"
			component={Cropper}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="Preview"
			component={Preview}
			options={{
				headerTitle: 'Text Preview',
			}}
		/>
		<Stack.Screen name="Saving" component={Saving} />
	</Stack.Navigator>
)

export default ChildNavigator
