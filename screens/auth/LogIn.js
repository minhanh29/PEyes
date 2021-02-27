import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,
Image, ImageBackground, Alert } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { logIn, loading } from '../../redux/actionCreators'
import styles from './AuthStyle'
import loginBg from '../../res/loginBg.png'
import logo from '../../res/logo.png'
import Loading from '../Loading'

class LogIn extends Component {
	state = {
		username: '',
		password: '',
		showPass: false,
	}

	logIn = () => {
		if (!(this.state.username && this.state.password))
		{
			Alert.alert("Log In Failed", "Please fill all the input fields")
			return
		}

		const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (format.test(this.state.username))
		{
			Alert.alert("Invalid username", "Username cannot contain special characters")
			return
		}

		this.props.startLoading();
		this.props.logIn({
			username: this.state.username,
			password: this.state.password,
		})
	}

	signUp = () => {
		// move to signUp screen
		this.props.navigation.navigate('SignUp')
	}

	toggleShowPass = () => {
		this.setState(prevState => ({
			showPass: !prevState.showPass,
		}))
	}

	render() {
		if (this.props.visible)
		{
			return (
				<Loading text="Logging In..." visible={this.props.visible} />
			)
		}

		return (
			<ImageBackground source={loginBg} style={styles.bgContainer}>
				<View style={styles.logoContainer}>
					<Image source={logo} style={styles.logo} />
					<Text style={styles.logoText}>PEyes</Text>
				</View>

				<View style={styles.inputContainer}>
					<Ionicons name='ios-person' size={25} color='rgba(0, 0, 0, 0.7)' style={styles.inputIcon}/>
					<TextInput
						onChangeText={username => this.setState({username})}
						value={this.state.username}
						placeholder="Username"
						placeholderTextColor='rgba(0, 0, 0, 0.7)'
						underlineColorAndroid='transparent'
						style={styles.input}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Ionicons name='ios-lock-closed' size={25} color='rgba(0, 0, 0, 0.7)' style={styles.inputIcon}/>
					<TextInput
						onChangeText={password => this.setState({password})}
						value={this.state.password}
						placeholder="Password"
						secureTextEntry={!this.state.showPass}
						placeholderTextColor='rgba(0, 0, 0, 0.7)'
						underlineColorAndroid='transparent'
						style={styles.input}
					/>
					<TouchableOpacity onPress={this.toggleShowPass} style={styles.btnEye}>
						<Ionicons name={this.state.showPass ? 'eye-off-outline' : 'eye-outline'} size={25} color='rgba(0, 0, 0, 0.7)' />
					</TouchableOpacity>
				</View>

				<TouchableOpacity onPress={this.logIn} style={styles.btnLogin}>
					<Text style={styles.textLogin}>Log In</Text>
				</TouchableOpacity>

				<View style={styles.signUpContainer}>
					<Text style={[styles.promptText, styles.shadowText]}>Do not have an account?</Text>
					<TouchableOpacity onPress={this.signUp} style={styles.btnSignUp} >
						<Text style={[styles.signupText, styles.shadowText]}>Sign Up</Text>
					</TouchableOpacity>
				</View>

			</ImageBackground>
		)
	}
}

const mapStateToProps = (state) => ({
	visible: state.loading.visible,
})

const mapDispatchToProps = (dispatch) => ({
	logIn: (credentials) => dispatch(logIn(credentials)),
	startLoading: () => dispatch(loading(true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
