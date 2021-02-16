import ml from '@react-native-firebase/ml'

export const processImg = async (path) => {
	// fake
	console.log("Converting Image ", path)
	setTimeout(() => {
		this.setState({ text: 'Minh Anh is handsome' })
	}, 2000)

	// try {
	// 	const process = await ml().cloudTextRecognizerProcessImage(path);
	// 	console.log('Found text: ', process.text);
	// 	if (process.text === "")
	// 		this.setState({ text: 'No Text Found' })
	// 	else
	// 		this.setState({ text: process.text })

	// 	process.blocks.forEach(block => {
	// 		console.log('Found block with text: ', block.text);
	// 		console.log('Confidence: ', block.confidence);
	// 		console.log('Languages found: ', block.recognizeLanguages);
	// 	});
	// }
	// catch (ex) {
	// 	this.setState({ text: 'No Text Found' })
	// 	Alert.alert("Converting Error", "Please check your Internet connection!")
	// }
}
