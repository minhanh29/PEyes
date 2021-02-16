import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'
import ImagePicker from 'react-native-image-crop-picker'

import { processImg } from '../../api/TextRecognition'
import Loading from '../../Loading'
import { loading } from '../../../redux/actionCreators'

import styles from './CaptureStyles'
import shutter from '../../../res/shutter.png'
import switchCam from '../../../res/cameraSwitch.png'
import picker from '../../../res/picker.png'

class Capture extends Component {
	state = {
		camera: null,
		type: RNCamera.Constants.Type.back,
		backCam: true,
	}

	// set up camera
	setCamera = (ref) => {
		this.setState({ camera: ref })
	}

	// use the api to get image and move to the next screen
	convertImg = async (path) => {
		this.props.startLoading()
		if (!path)
		{
			Alert.alert("Access Error", "Cannot access your image!")
			this.props.stopLoading()
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
			this.props.navigation.navigate('Preview', { process })
		} catch (e) {
			console.log(e);
			Alert.alert(e.message ? e.message : e);
		}
	}

	// take photos
	capture = async () => {
		if (this.state.camera) {
			const options = {
				quality: 0.5,
				base64: true,
			}

			try {
				const data = await this.state.camera.takePictureAsync(options);
				const image = await ImagePicker.openCropper({
					path: data.uri,
					freeStyleCropEnabled: true,
				})

				// convert image to text
				this.convertImg(image.path)

			} catch (error) {
				Alert.alert(error.message ? error.message : error);
			}
		}
	}

	switchCamera = () => {
		if (this.state.backCam)
		{
			this.setState({
				type: RNCamera.Constants.Type.front,
				backCam: false,
			})
		} else {
			this.setState({
				type: RNCamera.Constants.Type.back,
				backCam: true,
			})
		}
	}

	pickImg = async () => {
		try {
			const image = await ImagePicker.openPicker({
				cropping: true,
				freeStyleCropEnabled: true,
				sortOrder: 'none',
			})

			// convert image to text
			this.convertImg(image.path)
		} catch (e) {
			console.log(e);
			Alert.alert(e.message ? e.message : e);
		}
	}

	render() {
		if (this.props.visible)
		{
			return (
				<Loading text="Detecting text..." visible={this.props.visible} />
			)
		}

		return (
			<View style={styles.container}>
				<RNCamera
					ref={this.setCamera}
					style={styles.preview}
					type={this.state.type}
					flashMode={RNCamera.Constants.FlashMode.off}
					captureAudio={false}
					androidCameraPermissionOptions={{
						title: 'Permission to use camera',
						message: 'We need your permission to use your camera',
						buttonPositive: 'OK',
						buttonNegative: 'Cancel'
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission to use audio recording',
						message: 'We need your permission to use your audio',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel',
					}}
				/>

				<View style={styles.btnContainer}>
					<TouchableOpacity style={styles.btnSwitch} onPress={this.switchCamera}>
						<Image source={switchCam} style={styles.switchImg}/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.btnCapture} onPress={this.capture}>
						<Image source={shutter} style={styles.captureImg}/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.btnPicker} onPress={this.pickImg}>
						<Image source={picker} style={styles.pickerImg}/>
					</TouchableOpacity>
				</View>

			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	visible: state.loading.visible,
})

const mapDispatchToProps = (dispatch) => ({
	startLoading: () => dispatch(loading(true)),
	stopLoading: () => dispatch(loading(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Capture)
