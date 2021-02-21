import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'

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

	// take photos
	capture = async () => {
		if (this.state.camera) {
			const options = {
				quality: 0.5,
				base64: true,
			}

			try {
				const data = await this.state.camera.takePictureAsync(options);
				this.props.navigation.navigate('Cropper', {
					isCap: true,
					path: data.uri,
				})
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
		this.props.navigation.navigate('Cropper', {
			isCap: false,
			path: null,
		})
	}

	render() {
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

export default Capture
