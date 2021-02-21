import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { readFile } from 'react-native-fs'

import word from '../../res/word.png'

class Card extends Component {
	openFile = async () => {
		await this.props.goToPreview(this.props.id)
		// try {
		// 	const content = await readFile(this.props.path, 'base64')
		// 	console.log(content)
		// } catch (e) {
		// 	console.log(e)
		// }
	}

	render() {
		return (
			<TouchableOpacity style={styles.btnContainer} onPress={this.openFile}>
				<View style={styles.container}>
					<Image source={word} style={styles.iconImg} />

					<View style={styles.textContainer}>
						<Text style={styles.titleText}>{this.props.title}</Text>
						<Text style={styles.contentText}>{this.props.date}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
	btnContainer: {
		marginLeft: 20,
		marginTop: 15,
		marginBottom: 5,
	},
	container: {
		width: WIDTH - 40,
		backgroundColor: 'white',
		borderRadius: 10,
		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.5,
		elevation: 3,
		padding: 15,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},

	iconImg: {
		width: 50,
		height: 50,
		flex: 1,
	},
	textContainer: {
		flex: 5,
		marginLeft: 15,
	},
	titleText: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	contentText: {
		color: 'gray',
	}
})

export default Card
