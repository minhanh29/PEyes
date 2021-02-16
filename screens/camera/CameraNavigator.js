import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Capture from './Capture/Capture'
import Preview from './Preview/Preview'
import Saving from './Saving/Saving'

const Stack = createStackNavigator()

const CameraNavigator = () => (
	<Stack.Navigator screenOptions={{
		headerShown: false,
	}}
		initialRouteName="Capture"
	>
		<Stack.Screen name="Capture" component={Capture} />
		<Stack.Screen name="Preview" component={Preview} />
		<Stack.Screen name="Saving" component={Saving} />
	</Stack.Navigator>
)

export default CameraNavigator
