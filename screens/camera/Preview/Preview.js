import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { writeFile, mkdir, ExternalDirectoryPath, DocumentDirectoryPath } from 'react-native-fs'
import Mailer from 'react-native-mail'

import styles from './PreviewStyles'

class Preview extends Component {
	constructor(props) {
		super(props)

		// get text from Capture screen
		const process = props.route.params.process;
		this.state = {
			text: process ? process.text : "Text Detection Failed",
		}
	}

	componentDidMount() {
		// set header buttons
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={this.saveDoc} style={styles.btnSave} >
					<Text style={styles.saveText}>Save</Text>
				</TouchableOpacity>
			)
		})
	}

	saveDoc = async () => {
		if (!process)
			return

		const doc = new Document();

		// format the doc
		const blocks = this.state.text.split('\n')
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
			const fileName = '/PEyes-Generated-Word-' + Date.now() + '.docx';
			path += fileName
			console.log(path)
			await writeFile(path, string, 'base64')

			console.log('Word file written')

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

	render() {
		return (
			<ScrollView style={styles.container}>
				<TextInput
					value={this.state.text}
					onChangeText={text => this.setState({text})}
					multiline={true}
					style={styles.editField}
				/>
			</ScrollView>
		)
	}
}

export default Preview
