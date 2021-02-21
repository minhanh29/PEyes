import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { writeFile, mkdir, DocumentDirectoryPath } from 'react-native-fs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Mailer from 'react-native-mail'

import { updateTitle } from '../../../redux/actionCreators'

class Saving extends Component {
	// send email
	sendDoc = async () => {
		const doc = new Document();

		// format the doc
		const blocks = "Hello"
		doc.addSection({
			properties: {},
			children:[
				new Paragraph({
					children: blocks.map(block => new TextRun({
						text: block,
						font: 'Times New Roman',
						size: 24,
						break: 1,
					}))
				})
			]
		})

		try {
			// write text to Word
			const string = await Packer.toBase64String(doc)

			// create a folder for the app
			let path = DocumentDirectoryPath + '/PEyes'
			await mkdir(path)

			// create file name baseed on date time
			const fileName = 'PEyes-Generated-Word-' + Date.now() + '.docx';
			path += "/" + fileName
			console.log(path)
			await writeFile(path, string, 'base64')

			console.log('Word file written', path)

			// send Word to email
			const d = new Date()
			const subject = 'PEyes Generated Word File ' + d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()
			Mailer.mail({
				subject: subject,
				recipients: ['minhanhng.sofl@gmail.com'],
				body: '<b>Congratulations! Your Word file has been successfully created.</b>',
				isHTML: true,
				attachments: [{
					path: path,
					type: 'docx',
				}]
			}, (error, event) => {
				Alert.alert(
					error,
					event,
					[
						{ text: 'Ok', onPress: () => console.log('OK: email error res') },
						{ text: 'Cancel', onPress: () => console.log('Cancel email res') }
					],
					{ cancelable: true }
				)
			})
		} catch (e) {
			console.log(e.message)
		}
	}

	render()
	{
		const doc = this.props.docs[0]
		console.log("my doc 1", this.props.docs)
		console.log("my doc", doc)
		return (
			<View>
				<Text>{doc ? doc.title : "Loading..."}</Text>
				<Text>Saving</Text>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	docs: state.firestore.ordered.docs,
})

const mapDispatchToProps = (dispatch) => ({
	updateTitle: (item) => dispatch(updateTitle(item))
})


export default compose(
	firestoreConnect((props) => {
		console.log("id", props.route.params.id)
		return [{
			collection: 'docs',
			doc: props.route.params.id,
		}]
	}),
	connect(mapStateToProps, mapDispatchToProps)
)(Saving)
