import React, { Component } from 'react'
import { Alert, TouchableOpacity, View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import word from '../../res/word.png'

const { width: WIDTH } = Dimensions.get('window')

class Card extends Component {
	state = {
		isChecked: false,
	}

	componentDidUpdate() {
		if (!this.props.selection && this.state.isChecked)
			this.setState({isChecked: false})
		if (this.props.isDeleted && this.state.isChecked)
		{
			this.props.deleteMe(this.props.id)
		}
	}

	openFile = async () => {
		try {
			await this.props.goToPreview(this.props.id)
		} catch {
			Alert.alert("File Error", "Cannot open the file.")
		}
	}

	toggleCheck = () => {
		if (this.state.isChecked)  // it's gonna unchecked
			this.props.deselect()
		else
			this.props.select()
		this.setState(prev => ({
			isChecked: !prev.isChecked,
		}))
	}

	toggleSelect = () => {
		this.props.toggleSelect()
		if (this.props.selection)
		{
			this.setState({isChecked: true})
			this.props.select()
		}
	}

	render() {
		const pad = this.props.selection ? 80 : 40;
		const iconName = this.state.isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'
		return (
			<View style={styles.container}>
				{this.props.selection ?
				<TouchableOpacity onPress={this.toggleCheck}>
					<Ionicons name={iconName}
						size={30}
						color='#009fd9'
						style={styles.checkIcon}
					/>
				</TouchableOpacity>
				: null
				}

				<TouchableOpacity style={styles.btnContainer}
					onPress={this.props.selection ? this.toggleCheck : this.openFile}
					onLongPress={this.toggleSelect}
					delayLongPress={1000}
				>
					<View style={styles.cardContainer} width={WIDTH - pad}>
						<Image source={word} style={styles.iconImg} />

						<View style={styles.textContainer}>
							<Text style={styles.titleText}>{this.props.title}</Text>
							<Text style={styles.contentText}>{this.props.date}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
		marginHorizontal: 10,
	},
	btnContainer: {
		marginTop: 15,
		marginBottom: 6,
	},
	cardContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.0,
		elevation: 2,
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
	},
	checkIcon: {
		marginRight: 10,
	}
})

export default Card
