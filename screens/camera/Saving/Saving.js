import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { writeFile, mkdir, DocumentDirectoryPath } from 'react-native-fs';
import { connect } from 'react-redux';
import Mailer from 'react-native-mail';
import { Checkbox, TextInput, Button } from 'react-native-paper'
import { HeaderBackButton } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/native'

import { saveToFirestore, updateDoc } from '../../../redux/actionCreators';
import logo from '../../../res/logo.png';
import bg from '../../../res/saveBg.png';
import styles from './SavingStyles';

class Saving extends Component {
	constructor(props)
	{
		super(props)
		const isUpdate = props.route.params.isUpdate
		this.state = {
			isUpdate,
			id: props.route.params.id,
			title: isUpdate ? props.route.params.title : 'PEyes-' + Date.now(),
			content: props.route.params.content,
			isMailing: false,
			onGallery: false,
			isPDF: false,
			isAttach: false,
			email: '',
		}
	}

	saveDoc = () => {
		if (this.state.isUpdate)
		{
			// update an existing document
			this.props.updateDoc({
				id: this.state.id,
				title: this.state.title,
				content: this.state.content,
			})
			console.log('Updated document')
		} else {
			// save to firestore
			this.props.saveToFirestore({
				uid: this.props.uid,
				title: this.state.title,
				content: this.state.content,
			})
			console.log('new doc saved')
		}
	}

	// send email
	sendDoc = async () => {
		const doc = new Document();

		// format the doc
		const blocks = this.state.content.split('\n')
		doc.addSection({
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
			path += "/" + this.state.title + ".docx"
			console.log(path)
			await writeFile(path, string, 'base64')

			console.log('Word file written', path)

			// send Word to email
			const d = new Date()
			const subject = 'PEyes ' + d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()
			Mailer.mail({
				subject: subject,
				recipients: [this.state.email],
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

	handleConfirm = () => {
		// save document
		this.saveDoc()

		// send email is checked
		if (this.state.isMailing)
		{
			this.sendDoc()
				.then(() => {
					this.props.navigation.dispatch(StackActions.popToTop())
				})
		}
		else
		{
			Alert.alert("Document Saved", "Your document has been saved successfully")
			this.props.navigation.dispatch(StackActions.popToTop())
		}
	}

	render()
	{
		const date = new Date();
		const myDate = date.toLocaleString()
		return (
			<ImageBackground source={bg} style={styles.container}>
				<HeaderBackButton
					onPress={this.props.navigation.goBack}
					tintColor='rgba(255, 194, 57, 1)'
					pressColorAndroid='rgba(200, 194, 57, 1)'
					style={styles.btnBack}
				/>
				<Image source={logo} style={styles.logo}/>
				<Text style={styles.textDate}>{myDate}</Text>

				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='Title'
							placeholder='Your file title'
							value={this.state.title}
							onChangeText={title => this.setState({title})}
						/>
					</View>

					{this.state.isMailing ?
					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='Email'
							placeholder='Destination email'
							value={this.state.email}
							onChangeText={email => this.setState({email})}
						/>
					</View>
					: <View></View>}

					<View style={styles.checkBoxContainer}>
						<Checkbox
							status={this.state.isMailing ? 'checked' : 'unchecked'}
							onPress={() => this.setState({ isMailing: !this.state.isMailing })}
							color='#eba400'
						/>
						<Text style={styles.checkBoxText}>Send Email</Text>
					</View>

					<View style={styles.checkBoxContainer}>
						<Checkbox
							status={this.state.onGallery ? 'checked' : 'unchecked'}
							onPress={() => this.setState({ onGallery: !this.state.onGallery })}
							color='#eba400'
						/>
						<Text style={styles.checkBoxText}>Save on Gallery</Text>
					</View>

					<View style={styles.checkBoxContainer}>
						<Checkbox
							status={this.state.isPDF ? 'checked' : 'unchecked'}
							onPress={() => this.setState({ isPDF: !this.state.isPDF })}
							color='#eba400'
						/>
						<Text style={styles.checkBoxText}>Save as PDF (Word by default)</Text>
					</View>

					{this.state.isUpdate ?
						<View></View> :
						<View style={styles.checkBoxContainer}>
							<Checkbox
								status={this.state.isAttach ? 'checked' : 'unchecked'}
								onPress={() => this.setState({ isAttach: !this.state.isAttach })}
								color='#eba400'
							/>
							<Text style={styles.checkBoxText}>Attach Image at the end</Text>
						</View>
					}

					<Button
						mode='contained'
						dark={true}
						style={styles.btnConfirm}
						onPress={this.handleConfirm}
						color='#eba400'
					>
						Confirm
					</Button>
				</View>
			</ImageBackground>
		)
	}
}

const mapStateToProps = (state) => ({
	uid: state.firebase.auth.uid,
})

const mapDispatchToProps = (dispatch) => ({
	saveToFirestore: (item) => dispatch(saveToFirestore(item)),
	updateDoc: (item) => dispatch(updateDoc(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Saving)
