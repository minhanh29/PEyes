import ml from '@react-native-firebase/ml'
import { Alert } from 'react-native'

// text recognition
export const processImg = async (path) => {
	// fake
	console.log("Converting Image ", path)
	await new Promise(something => setTimeout(something, 2000))
	return {
		text: "Minh anh is here\nHello there orem ipsum dolor \nsit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt \nut labore et dolore magna \naliqua. Ut enim ad minim veniam, \nquis nostrud exercitation ullamco laboris \nnisi ut aliquip ex ea \ncommodo consequat. Duis aute irure\ndolor in reprehenderit in voluptate\n velit esse cillum dolore \neu fugiat nulla pariatur. Excepteur \nsint occaecat cupidatat non proident, sunt in\n culpa qui officia \ndeserunt mollit anim id est laborum.",
		blocks: [
			{ text: "Minh anh is here" },
			{ text: "Hello There" },
		]
	}

	// try {
	// 	const process = await ml().cloudTextRecognizerProcessImage(path, {
	// 		languageHints: ['EN', 'VI'],
	// 	})
	// 	console.log('Found text: ', process.text);

	// 	if (process.text === "")
	// 		return null;

	// 	process.blocks.forEach(block => {
	// 		console.log('Found block with text: ', block.text);
	// 		console.log('Confidence: ', block.confidence);
	// 		console.log('Languages found: ', block.recognizeLanguages);
	// 	});

	// 	return process
	// }
	// catch (ex) {
	// 	Alert.alert("Connection Error", "Please check your Internet connection!")
	// }

	// return null
}
