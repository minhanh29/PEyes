import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import { Button } from 'react-native-paper'

import styles from './PreviewStyles'

class Preview extends Component {
	constructor(props) {
		super(props)

		// get text from Capture screen
		const process = props.route.params.process;
		this.state = {
			text: process ? process.text : "No Text Found",
			setOp: false, // check setting naviatgion
		}
	}

	componentDidMount() {
		if (this.state.setOp)
			return

		this.setState({ setOp: true })

		// set header buttons
		this.props.navigation.setOptions({
			headerRight: () => (
				<Button style={styles.btnSave} mode='text' color='#ffc239' onPress={this.saveDoc}>
					Save
				</Button>
			),
			headerLeft: () => (
				<HeaderBackButton
					onPress={this.goBack}
					tintColor='rgba(255, 194, 57, 1)'
					pressColorAndroid='rgba(200, 194, 57, 1)'
				/>
			)
		})
	}

	goBack = () => {
		this.props.navigation.goBack()
	}

	// save document to database
	saveDoc = () => {
		if (!process)
			return

		// move to saving screen
		this.props.navigation.navigate('Saving', {
			id: this.props.route.params.id,
			isUpdate: this.props.route.params.isUpdate,
			title: this.props.route.params.title,
			content: this.state.text,
		})
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<TextInput
					value={this.state.text}
					onChangeText={text => this.setState({text})}
					multiline={true}
					autoFocus={true}
					style={styles.editField}
					selectionColor='#eda600'
				/>
			</ScrollView>
		)
	}
}

export default Preview
