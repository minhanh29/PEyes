import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper'
import { HeaderBackButton } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth'

import { reauthenticate } from '../../../redux/actionCreators'
import logo from '../../../res/password.png';
import bg from '../../../res/saveBg.png';
import styles from './ChangePassStyles';

class ChangePass extends Component {
	state = {
		oldPass: '',
		newPass: '',
		confirmPass: '',
		isLoading: false,
	}

	// change password
	reauthenticate = (currentPassword) => {
		var user = auth().currentUser;
		var cred = this.props.firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
		return user.reauthenticateWithCredential(cred);
	}

	changePass = async (oldPass, newPass) => {
		try {
			await this.props.reauthenticate(oldPass)

			const user = auth().currentUser;
			await user.updatePassword(newPass)

			Alert.alert("Password Updated", "Your password has been successfully changed")
		} catch (e) {
			throw(e)
		}
	}


	handleSubmit = async () => {
		this.setState({ isLoading: true })
		const { oldPass, newPass, confirmPass } = this.state;
		if (oldPass === '' || newPass === '' || confirmPass === '')
		{
			Alert.alert("Error", "Please fill out all the fields");
			return
		}

		if (!(confirmPass === newPass))
		{
			Alert.alert("Error", "Confirm Password does not match");
			return
		}

		try {
			await this.changePass(oldPass, newPass)
			this.setState({ isLoading: false })
		} catch (e) {
			console.log(e)
			if (e.code === "auth/wrong-password")
				Alert.alert("Wrong Password", "You have typed a wrong current password")

			if (e.code === "auth/too-many-requests")
				Alert.alert("Too Many Requests", "We have blocked all requests from this device due to unusual activity. Try again later.")

			if (e.code === "auth/weak-password")
				Alert.alert("Weak Password", "The given password is invalid. Password should be at least 6 characters.")

			this.setState({ isLoading: false })
		}
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
				<Text style={styles.textTitle}>Change Password</Text>

				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='Current Password'
							value={this.state.oldPass}
							onChangeText={oldPass => this.setState({oldPass})}
							secureTextEntry={true}
						/>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='New Password'
							value={this.state.newPass}
							onChangeText={newPass => this.setState({newPass})}
							secureTextEntry={true}
						/>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							mode='flat'
							label='Confirm Password'
							placeholder="Retype your new password"
							value={this.state.confirmPass}
							onChangeText={confirmPass => this.setState({confirmPass})}
							secureTextEntry={true}
						/>
					</View>
					<Button
						mode='contained'
						dark={true}
						style={styles.btnSubmit}
						onPress={this.handleSubmit}
						color='#eba400'
						disabled={this.state.isLoading}
					>
						SUBMIT
					</Button>
				</View>
			</ImageBackground>
		)
	}
}

const mapStateToProps = (state) => ({
	firebase: state.firebase
})

const mapDispatchToProps = (dispatch) => ({
	reauthenticate: (currentPassword) => dispatch(reauthenticate(currentPassword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass)
