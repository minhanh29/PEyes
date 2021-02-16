import React from 'react'
import { StyleSheet, Text } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'

const Loading = (props) => (
	<AnimatedLoader
		visible={props.visible}
		overlayColor='rgba(255, 255, 255, 1)'
		source={require('../res/loader.json')}
		animationStyle={style.lottie}
		speed={1}
	>
		<Text>{props.text}</Text>
	</AnimatedLoader>
)

const style = StyleSheet.create({
	lottie: {
		width: 100,
		height: 100,
	}
})

export default Loading
