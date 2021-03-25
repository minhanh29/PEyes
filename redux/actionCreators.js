import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native'

export const LOADING = 'LOADING'
export const CURRENT_DOC = 'CURRENT_DOC'

export const createDoc = (payload) => ({
	type: CURRENT_DOC,
	payload,
})

export const logIn = ({ username, password }) => (dispatch, getState, getFirebase) => {
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
	username = username.toLowerCase()
	console.log('siging in...')
	getFirebase().login({
		email: username + '@peyes.com',
		password
	})
		.then(() => {
			console.log('Signed In success')
			// dispatch({
			// 	type: LOGIN,
			// 	payload: { username, password },
			// })
			dispatch(loading(false))
		})
		.catch(e => {
			if (e.code === "auth/user-not-found")
				Alert.alert("User Not Found", "There is no user record corresponding to this identifier. The user may have been deleted.")
			else if (e.code === "auth/unknown")
				Alert.alert("Connection Failed", "Please check your network connection!")
			else if (e.code === "auth/wrong-password")
				Alert.alert("Wrong password", "The password is invalid.")

			// dispatch({
			// 	type: LOGIN,
			// 	payload: getState().auth,
			// })
			dispatch(loading(false))
		})
}


export const signUp = ({ username, email, password }) => (dispatch, getState, getFirebase) => {
	// setTimeout(() => {
	// 	dispatch({
	// 		type: LOGIN,
	// 		payload: true,
	// 	})
	// 	dispatch(loading(false))
	// }, 2000)
	username = username.toLowerCase()
	email = email.toLowerCase()
	console.log('siging up...')
	auth().createUserWithEmailAndPassword(username + '@peyes.com', password)
		.then((res) => {
			console.log('uid', res.user.uid)
			console.log('Signed Up success')
			// update firestore profile
			firestore().collection('users').doc(res.user.uid).set({ username, email })

			// update redux store
			// dispatch({
			// 	type: LOGIN,
			// 	payload: { username, password },
			// })
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

			// dispatch({
			// 	type: LOGIN,
			// 	payload: getState().auth,
			// })
			dispatch(loading(false))
		})
}

export const signOut = () => (dispatch, getState, getFirebase) => {
	// setTimeout(() => {
	// 	dispatch({
	// 		type: LOGIN,
	// 		payload: false,
	// 	})
	// 	dispatch(loading(false))
	// }, 1000)

	getFirebase().logout()
		.then(() => {
			console.log("signout success")
			// dispatch({
			// 	type: LOGIN,
			// 	payload: {
			// 		username: null,
			// 		password: null,
			// 		uid: null,
			// 	},
			// })
		})
		.catch(e => {
			console.log("signout failed")
			dispatch({
				type: LOGIN,
				payload: getState().auth,
			})
		})
}


export const loading = visible => ({
	type: LOADING,
	payload: visible,
})


// save new docs to firestore
export const saveToFirestore = ({ uid, title, content }) => (dispatch, getState, getFirebase) => {
	firestore().collection('docs').add({
		uid, title, content,
		date: new Date(),
	})
}

export const updateDoc = ({ id, title, content }) => (dispatch, getState, getFirebase) => {
	firestore().collection('docs')
		.doc(id).update({ title, content, date: new Date() })
}

// change password
export const reauthenticate = (currentPassword) => (dispatch, getState, getFirebase) => {
	var user = auth().currentUser;
	var cred = getFirebase().auth.EmailAuthProvider.credential(user.email, currentPassword);
	return user.reauthenticateWithCredential(cred);
}

// change email
export const changeEmail = (email, id) => (dispatch, getState, getFirebase) => {
	firestore().collection('users')
		.doc(id).update({ email })
}
