import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'

// crop image from path and movee to the specified screen
export const cropImg = (path, navigate) => {
	ImagePicker.openCropper({
		path: path,
		width: 200,
		height: 250,
		freeStyleCropEnabled: true,
	})
	.then((image) => {
		console.log('received cropped image', image);
		navigate(image.path)
	  })
	  .catch((e) => {
		console.log(e);
		Alert.alert(e.message ? e.message : e);
	  });
}

// const style = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	img: {
// 		width: 300,
// 		height: 300,
// 		resizeMode: 'contain',
// 	},
// 	button: {
// 		backgroundColor: 'blue',
// 		margin: 10,
// 		padding: 5,
// 	},
// 	text: {
// 		color: 'white',
// 		fontSize: 20,
// 		textAlign: 'center',
// 	}
// })


// class ImgPicker extends Component {
// 	state = {
// 		image: null,
// 	}

// 	pickSingle = () => {
// 		ImagePicker.openPicker({
// 			width: 500,
// 			height: 500,
// 			cropping: true,
// 			sortOrder: 'none',
// 			compressImageMaxWidth: 1000,
// 			compressImageMaxHeight: 1000,
// 			compressImageQuality: 1,
// 			cropperStatusBarColor: 'white',
// 			cropperToolbarColor: 'red',
// 			cropperActiveWidgetColor: 'yellow',
// 			cropperToolbarWidgetColor: 'black',
// 		})
// 			.then((image) => {
// 				console.log('Got Image ', image)
// 				this.setState({
// 					image: {
// 						uri: image.path,
// 						width: image.width,
// 						height: image.height,
// 						mime: image.mime,
// 					}
// 				})
// 				this.props.handleImage(this.state.image)
// 			})
// 			.catch((e) => {
// 				console.log('Got Error ', e)
// 				Alert.alert(e.message ? e.message : e)
// 			})
// 	}

// 	render()
// 	{
// 		return (
// 			<View style={style.container}>
// 				<View>
// 					<Image style={style.img} source={this.state.image} />
// 				</View>

// 				<TouchableOpacity onPress={this.pickSingle} style={style.button}>
// 					<Text style={style.text}>Select Single</Text>
// 				</TouchableOpacity>
// 			</View>
// 		)
// 	}
// }

// export default ImgPicker
