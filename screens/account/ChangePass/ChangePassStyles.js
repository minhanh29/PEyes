import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	btnBack: {
		width: 80,
	},
	textTitle: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
	formContainer: {
		backgroundColor: 'white',
		borderRadius: 15,
		padding: 10,
		paddingVertical: 20,
		marginTop: 20,
	},
	logo: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		marginVertical: 20,
	},
	inputContainer: {
		marginHorizontal: 7,
		marginTop: 10,
	},
	btnSubmit: {
		marginTop: 20,
		marginHorizontal: 25,
		borderRadius: 20,
	}
})

export default styles
