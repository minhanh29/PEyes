import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from './Dashboard'
import Preview from '../camera/Preview/Preview'
import Saving from '../camera/Saving/Saving'
import Cropper from '../camera/Cropper/Cropper'
import ChangePass from '../account/ChangePass/ChangePass'
import UpdateEmail from '../account/UpdateEmail/UpdateEmail'
import About from '../account/About/About'

const Stack = createStackNavigator()

const ChildNavigator = () => (
	<Stack.Navigator screenOptions={{
		headerShown: true,
		headerTintColor: 'rgba(255, 194, 57, 1)',
		headerStyle: {
			backgroundColor: 'rgba(29, 29, 45, 1)',
		},
		headerPressColorAndroid: 'rgba(255, 194, 57, 1)',
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
		<Stack.Screen
			name="Saving"
			component={Saving}
			options={{
				headerShown: false,
			}}
		/>
		<Stack.Screen
			name="ChangePass"
			component={ChangePass}
			options={{
				headerTitle: 'Update Password',
				headerShown: false,
			}}
		/>
		<Stack.Screen
			name="UpdateEmail"
			component={UpdateEmail}
			options={{
				headerTitle: 'Update Email',
				headerShown: false,
			}}
		/>
		<Stack.Screen
			name="About"
			component={About}
			options={{
				headerTitle: 'About PEyes',
			}}
		/>
	</Stack.Navigator>
)

export default ChildNavigator
