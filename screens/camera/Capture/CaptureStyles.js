import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	btnContainer: {
		backgroundColor: '#000',
		flexDirection: 'row',
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnCapture: {
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20,
	},
	btnSwitch: {
		position: 'absolute',
		top: 25,
		left: 20,
	},
	btnPicker: {
		position: 'absolute',
		top: 25,
		right: 20,
	},
	captureImg: {
		width: 70,
		height: 70,
	},
	switchImg: {
		width: 50,
		height: 50,
	},
	pickerImg: {
		width: 50,
		height: 50,
	}
})

export default styles
