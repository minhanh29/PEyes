import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Capture from '../camera/Capture/Capture'
import Gallery from '../gallery/Gallery'
import Account from '../account/Account'


const Tab = createBottomTabNavigator();

const Dashboard = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Capture") {
						iconName = focused ? 'camera' : 'camera-outline';
					} else if (route.name === "Gallery") {
						iconName = focused ? "documents" : "documents-outline";
					} else if (route.name === "Account") {
						iconName = focused ? "ios-person" : "ios-person-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				}
			})}

			tabBarOptions={{
				activeTintColor: 'rgba(255, 194, 57, 1)',
				inactiveTintColor: 'gray',
				activeBackgroundColor: 'rgba(29, 29, 45, 1)',
				inactiveBackgroundColor: 'rgba(29, 29, 45, 1)',
			}}
		>
			<Tab.Screen
				name="Capture"
				component={Capture}
				options={{
					tabBarLabel: ({ focused }) => focused ? <Text style={style.text}>Camera</Text> : null
				}}
			/>
			<Tab.Screen
				name="Gallery"
				component={Gallery}
				options={{
					tabBarLabel: ({ focused }) => focused ? <Text style={style.text}>Gallery</Text> : null
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					tabBarLabel: ({ focused }) => focused ? <Text style={style.text}>Account</Text> : null
				}}
			/>
		</Tab.Navigator>
	)
}

const style = StyleSheet.create({
	text: {
		color: 'rgba(255, 194, 57, 1)',
		fontSize: 12,
	}
})

export default Dashboard
