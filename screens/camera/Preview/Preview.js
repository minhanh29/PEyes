import React, { Component } from 'react'
import { ScrollView, TextInput } from 'react-native'
import  { connect } from 'react-redux'
import { Button } from 'react-native-paper'

import { createDoc } from '../../../redux/actionCreators'
import styles from './PreviewStyles'

class Preview extends Component {
	constructor(props) {
		super(props)

		// get text from Capture screen
		const process = props.process;
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
		this.props.createDoc({
			content: this.state.text,
		})
		this.props.navigation.navigate('Saving')
			// id: this.props.id,
			// isUpdate: this.props.isUpdate,
			// title: this.props.title,
			// content: this.state.text,
			// imgPath: this.props.imgPath,
		// })
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

const mapStateToProps = (state) => ({
	process: state.doc.process
})

const mapDispatchToProps = (dispatch) => ({
	createDoc: payload => dispatch(createDoc(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
