import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { TextInput, Button } from 'react-native-paper'
import { HeaderBackButton } from '@react-navigation/stack'

import { changeEmail } from '../../../redux/actionCreators'
import logo from '../../../res/emailIcon.png';
import bg from '../../../res/saveBg.png';
import styles from './UpdateEmailStyles';

class UpdateEmail extends Component {
	state = {
		oldEmail: '',
		newEmail: '',
		confirmEmail: '',
	}

	handleSubmit = () => {
		const { oldEmail, newEmail, confirmEmail } = this.state;
		if (oldEmail === '' || newEmail === '' || confirmEmail === '')
		{
			Alert.alert("Error", "Please fill out all the fields");
			return
		}

		// validate new email
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!reg.test(newEmail))
		{
			Alert.alert("Invalid Email", "Please input a valid email!")
			return
		}

		if (!(confirmEmail === newEmail))
		{
			Alert.alert("Error", "Confirm email does not match");
			return
		}

		// compare old email
		const realEmail = this.props.user[0].email
		if (!(oldEmail === realEmail))
		{
			Alert.alert("Wrong Email", "You have typed a wrong default email");
			return
		}

		this.props.changeEmail(newEmail, this.props.uid)
		Alert.alert("Success", "Your email is successfully updated");
	}

	render()
	{
		return (
			<ImageBackground source={bg} style={styles.container}>
				<HeaderBackButton
					onPress={this.props.navigation.goBack}
					tintColor='rgba(255, 194, 57, 1)'
					pressColorAndroid='rgba(200, 194, 57, 1)'
					style={styles.btnBack}
				/>
				<Image source={logo} style={styles.logo}/>
				<Text style={styles.textTitle}>Update Email</Text>

				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='Current Email'
							value={this.state.oldEmail}
							onChangeText={oldEmail => this.setState({oldEmail})}
							secureTextEntry={true}
						/>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='New Email'
							value={this.state.newEmail}
							onChangeText={newEmail => this.setState({newEmail})}
							secureTextEntry={true}
						/>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='Confirm Email'
							placeholder="Retype your new password"
							value={this.state.confirmEmail}
							onChangeText={confirmEmail => this.setState({confirmEmail})}
							secureTextEntry={true}
						/>
					</View>
					<Button
						mode='contained'
						dark={true}
						style={styles.btnSubmit}
						onPress={this.handleSubmit}
						color='#eba400'
					>
						SUBMIT
					</Button>
				</View>
			</ImageBackground>
		)
	}
}

const mapStateToProps = (state) => ({
	uid: state.firebase.auth.uid,
	user: state.firestore.ordered.users,
})

const mapDispatchToProps = (dispatch) => ({
	changeEmail: (email, id) => dispatch(changeEmail(email, id))
})

export default compose(
	firestoreConnect((props) => {
		return [
		{
			collection: 'users',
			doc: `${props.firebase._.authUid}`,
		}
	]
	}),
	connect(mapStateToProps, mapDispatchToProps)
)(UpdateEmail)
