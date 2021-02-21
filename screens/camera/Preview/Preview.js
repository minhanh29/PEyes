import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'

import styles from './PreviewStyles'
import { saveToFirestore, updateContent } from '../../../redux/actionCreators'

class Preview extends Component {
	constructor(props) {
		super(props)

		// get text from Capture screen
		const process = props.route.params.process;
		this.state = {
			text: process ? process.text : "Text Detection Failed",
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
				<TouchableOpacity onPress={this.saveDoc}>
					<View style={styles.btnSave}>
						<Text style={styles.saveText}>Save</Text>
					</View>
				</TouchableOpacity>
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
		this.props.navigation.navigate('Capture')
	}

	// save document to database
	saveDoc = () => {
		if (!process)
			return

		if (this.props.route.params.isUpdate)
		{
			// update an existing document
			this.props.updateContent({
				id: this.props.route.params.id,
				content: this.state.text,
			})
		} else {
			// create new document
			const fileName = 'PEyes-Generated-Word-' + Date.now() + '.docx';

			// save to firestore
			this.props.saveToFirestore({
				uid: this.props.uid,
				title: fileName,
				content: this.state.text,
			})
		}

		// move to saving screen
		this.props.navigation.navigate('Saving', {
			id: this.props.route.params.id,
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
				/>
			</ScrollView>
		)
	}
}

const mapStateToProps = (state) => ({
	uid: state.firebase.auth.uid,
})

const mapDispatchToProps = (dispatch) => ({
	saveToFirestore: (item) => dispatch(saveToFirestore(item)),
	updateContent: (item) => dispatch(updateContent(item))
})


export default connect(mapStateToProps, mapDispatchToProps)(Preview)
