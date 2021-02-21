import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,
Image, ImageBackground, Alert } from 'react-native'
// import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { signUp, loading } from '../../redux/actionCreators'
import styles from './AuthStyle'
import signupBg from '../../res/signupBg.png'
import logo from '../../res/logo.png'
import Loading from '../Loading'

class SignUp extends Component {
	state = {
		username: null,
		email: null,
		password: null,
		showPass: false,
	}

	logIn = () => {
		this.props.navigation.navigate('LogIn')
	}

	signUp = () => {
		if (!(this.state.username && this.state.email && this.state.password))
		{
			Alert.alert("Sign Up Failed", "Please fill all the input fields")
			return
		}

		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!reg.test(this.state.email))
		{
			Alert.alert("Invalid Email", "Please input a valid email!")
			return
		}

		const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (format.test(this.state.username))
		{
			Alert.alert("Invalid username", "Username cannot contain special characters")
			return
		}

		this.props.startLoading();
		this.props.signUp(this.state);
	}

	render() {
		if (this.props.visible)
		{
			return (
				<Loading text="Signing Up..." visible={this.props.visible} />
			)
		}
		return (
			<ImageBackground source={signupBg} style={styles.bgContainer}>
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
					<Ionicons name='ios-mail' size={25} color='rgba(0, 0, 0, 0.7)' style={styles.inputIcon}/>
					<TextInput
						onChangeText={email => this.setState({email})}
						value={this.state.email}
						placeholder="Email"
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

				<TouchableOpacity onPress={this.signUp} style={styles.btnLogin}>
					<Text style={styles.textLogin}>Sign Up</Text>
				</TouchableOpacity>

				<View style={styles.signUpContainer}>
					<Text style={[styles.promptText, styles.shadowText]}>Already have an account?</Text>
					<TouchableOpacity onPress={this.logIn} style={styles.btnSignUp} >
						<Text style={[styles.signupText, styles.shadowText]}>Log In</Text>
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
	signUp: (credentials) => dispatch(signUp(credentials)),
	startLoading: () => dispatch(loading(true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
