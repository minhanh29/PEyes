import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './AboutStyles'

class About extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>PEyes is a poweful text recognition application which makes use of the Google Cloud API.</Text>
				<Text style={styles.text}>Developer: Minh Anh Nguyen</Text>
			</View>
		)
	}
}

export default About
