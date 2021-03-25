import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebebeb',
	},
	listContainer: {
		flex: 1,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		paddingVertical: 10,
		paddingLeft: 10,
		backgroundColor: '#e89b00',
		shadowColor: '#875f0f',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3.0,
		elevation: 10,
	},
	logo: {
		width: 50,
		height: 50,
	},
	textHeader: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
	}
})

export default styles

