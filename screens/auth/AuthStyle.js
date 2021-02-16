import { StyleSheet, Dimensions } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
	bgContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	logo: {
		width: 120,
		height: 120,
	},
	logoText: {
		marginTop: 10,
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	inputContainer: {
		marginTop: 10,
	},
	input: {
		width: WIDTH - 50,
		height: 45,
		borderRadius: 25,
		fontSize: 15,
		paddingLeft: 45,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		color: 'rgba(0, 0, 0, 0.7)',
		marginHorizontal: 25,
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37,
		zIndex: 1,
	},
	btnEye: {
		position: 'absolute',
		top: 8,
		right: 37,
	},
	btnLogin: {
		width: WIDTH - 50,
		height: 45,
		borderRadius: 25,
		backgroundColor: 'rgba(239, 146, 0, 1)',
		justifyContent: 'center',
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowOpacity: 1,
		shadowRadius: 20,
		elevation: 7,
	},
	textLogin: {
		color: 'rgba(255, 255, 255, 1)',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	signUpContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	promptText: {
		color: 'rgba(255, 255, 255, 0.9)',
		fontSize: 16,
	},
	signupText: {
		color: 'rgba(255, 150, 0, 1)',
		fontWeight: '600',
		textDecorationLine: 'underline',
		fontSize: 16,
	},
	shadowText: {
		textShadowColor: 'rgba(100, 30, 0, 1)',
		textShadowOffset: {
			width: 0.6,
			height: 0.6,
		},
		textShadowRadius: 1,
	},
	btnSignUp: {
		marginLeft: 10,
	},
})

export default styles
