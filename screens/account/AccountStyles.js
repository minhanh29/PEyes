import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems:'center',
	},
	bg: {
		width: '100%',
		height: '30%',
		position: "absolute",
		top: 0,
		left: 0,
	},
	inforContainer: {
		marginTop: 110,
		width: '80%',
	},
	cardContainer: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
	},
	textName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 40,
	},
	textSub: {
		color: 'gray',
	},
	avatar: {
		position: 'absolute',
		top: -45,
	},
	btnUpgrade: {
		marginTop: 15,
	},
	settingLabel: {
		color: 'gray',
		fontSize: 13,
		fontWeight:'bold',
		marginVertical: 25,
		alignSelf: 'flex-start',
	},
	optionContainer: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'flex-start',
	},
	btnOption: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	textOption: {
		marginLeft: 10,
		fontSize: 15,
	},
	arrow: {
		position: 'absolute',
		right: 0,
	},
	divider: {
		width: '100%',
		marginVertical: 20,
		height: 1,
		backgroundColor: '#e6e6e6',
	}
})

export default styles
