import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	btnBack: {
		width: 80,
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
	textDate: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 16,
	},
	inputContainer: {
		marginHorizontal: 7,
	},
	checkBoxContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	checkBoxText: {
		fontSize: 15,
	},
	btnConfirm: {
		marginTop: 20,
		marginHorizontal: 25,
		borderRadius: 20,
	}
})

export default styles
