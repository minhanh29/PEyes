import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

export const LOGIN = 'LOGIN'
export const LOADING = 'LOADING'

export const logIn = ({ username, password }) => (dispatch, getState) => {
	// if (email ===  'minhanh29' && password === '2910sofl')
	// {
	// 	setTimeout(() => {
	// 		dispatch({
	// 			type: LOGIN,
	// 			payload: true,
	// 		})
	// 		dispatch(loading(false))
	// 	}, 3000)
	// }
	// else{
	// 	setTimeout(() => {
	// 		dispatch({
	// 			type: LOGIN,
	// 			payload: false,
	// 		})
	// 		dispatch(loading(false))
	// 		Alert.alert("Login Failed", "Invalid email or password!")
	// 	}, 3000)
	// }
	console.log('siging in...')
	auth().signInWithEmailAndPassword(username + '@peyes.com', password)
		.then(() => {
			console.log('Signed In success')
			dispatch({
				type: LOGIN,
				payload: { username, password },
			})
			dispatch(loading(false))
		})
		.catch(e => {
			if (e.code === 'auth/email-already-in-use') {
				console.log('Email is already in use')
				Alert.alert("Log In Failed", "Username is already in use!")
			}
			else
				Alert.alert("Login Failed", "Invalid email or password!")

			dispatch({
				type: LOGIN,
				payload: getState().auth,
			})
			dispatch(loading(false))
		})
}


export const signUp = ({ username, email, password }) => (dispatch, getState) => {
	// setTimeout(() => {
	// 	dispatch({
	// 		type: LOGIN,
	// 		payload: true,
	// 	})
	// 	dispatch(loading(false))
	// }, 2000)
	console.log('siging up...')
	auth().createUserWithEmailAndPassword(username + '@peyes.com', password)
		.then(() => {
			console.log('Signed Up success')
			dispatch({
				type: LOGIN,
				payload: { username, password },
			})
			dispatch(loading(false))
		})
		.catch(e => {
			if (e.code === 'auth/email-already-in-use') {
				console.log('Email is already in use')
				Alert.alert("Sign Up Failed", "Username is already in use!")
			}

			if (e.code === 'auth/invalid-email') {
				console.log("Email is invalid")
				Alert.alert("Sign Up Failed", "Invalid username!")
			}

			dispatch({
				type: LOGIN,
				payload: getState().auth,
			})
			dispatch(loading(false))
		})
}

export const signOut = () => (dispatch, getState) => {
	// setTimeout(() => {
	// 	dispatch({
	// 		type: LOGIN,
	// 		payload: false,
	// 	})
	// 	dispatch(loading(false))
	// }, 1000)

	auth().signOut()
		.then(() => {
			console.log("signout success")
			dispatch({
				type: LOGIN,
				payload: {
					username: null,
					password: null,
					uid: null,
				},
			})
		})
		.catch(e => {
			console.log("signout failed")
			dispatch({
				type: LOGIN,
				payload: getState().auth,
			})
		})
}


export const updateUID = (uid) => ({
	type: LOGIN,
	payload: { uid },
})


export const loading = visible => ({
	type: LOADING,
	payload: visible,
})
