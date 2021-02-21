import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { StackActions } from '@react-navigation/native'

import Loading from '../../Loading'
import { loading } from '../../../redux/actionCreators'
import { processImg } from '../../api/TextRecognition'


class Cropper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			opened: false,
		}
	}

	componentDidMount() {
		if (this.state.opened)
			return

		this.setState({opened: true})

		const { isCap, path } = this.props.route.params;
		if (isCap)
			this.cropFromCap(path)
		else
			this.cropFromPick()
	}

	// use the api to get image and move to the next screen
	convertImg = async (path) => {
		this.props.startLoading()
		if (!path)
		{
			Alert.alert("Access Error", "Cannot access your image!")
			this.props.stopLoading()
			this.props.navigation.navigate('Capture')
			return
		}

		try {
			const process = await processImg(path)

			// clean temp images
			ImagePicker.clean()
				.then(() => console.log('cleaned all temp images'))
				.catch((e) => console.log(e))

			console.log('Finished process file', process.text)

			this.props.stopLoading()

			// remove this screen from stack
			const popAction = StackActions.pop(1)
			await this.props.navigation.dispatch(popAction)

			// move to preview screen
			this.props.navigation.navigate('Preview', { process })
		} catch (e) {
			console.log(e);
			Alert.alert(e.message ? e.message : e);
			this.props.navigation.navigate('Capture')
		}
	}

	cropFromCap = async (path) => {
		try {
			const image = await ImagePicker.openCropper({
				path: path,
				freeStyleCropEnabled: true,
			})

			// convert image to text
			this.convertImg(image.path)

		} catch (error) {
			this.props.navigation.navigate('Capture')
		}
	}

	cropFromPick = async () => {
		try {
			const image = await ImagePicker.openPicker({
				cropping: true,
				freeStyleCropEnabled: true,
				sortOrder: 'none',
			})

			// convert image to text
			this.convertImg(image.path)
		} catch (e) {
			this.props.navigation.navigate('Capture')
		}
	}

	render() {
		return (
			this.props.visible ? <Loading text="Detecting text..." visible={this.props.visible} />
				: <View style={styles.container}></View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	}
})

const mapStateToProps = (state) => ({
	visible: state.loading.visible,
})

const mapDispatchToProps = (dispatch) => ({
	startLoading: () => dispatch(loading(true)),
	stopLoading: () => dispatch(loading(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cropper)
