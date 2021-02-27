import React, { Component } from 'react'
import { View, FlatList, Alert, Text, Image } from 'react-native'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Appbar } from 'react-native-paper'

import Card from './Card'
import styles from './GalleryStyles'
import logo from '../../res/logoWhite.png'

class Gallery extends Component {
	renderItem = ({ item }) => (
		<Card {...item} />
	)

	goToPreview = (id) => {
		try {
			// get the doc content with its id  (not uid)
			const doc = this.props.docs.filter(doc => doc.id == id).pop()
			console.log("Doc", doc)
			this.props.navigation.navigate('Preview', {
				id,
				isUpdate: true,
				title: doc.title,
				process: { text: doc.content }
			})
		} catch (e) {
			Alert.alert("Error", e.message)
		}
	}

	render() {
		const { docs } = this.props;
		console.log("Firestore Doc", docs)
		const data = docs ? docs.map(doc => ({
			id: doc.id,
			title: doc.title,
			date: doc.date.toDate().toLocaleString(),
			goToPreview: this.goToPreview,
		})) : []

		const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image source={logo} style={styles.logo} />
					<Appbar.Content title="PEyes" subtitle="CS Zone" color='white' />

					<Appbar.Action icon="magnify" color='white' onPress={() => {}} />
					<Appbar.Action icon={MORE_ICON} color='white' onPress={() => {}} />
				</View>

				<FlatList
					data={data}
					renderItem={this.renderItem}
					keyExtractor={item => item.id}
					style={styles.listContainer}
				/>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	docs: state.firestore.ordered.docs,
	uid: state.firebase.auth.uid,
})

export default compose(
	firestoreConnect((props) => {
		return [
		{
			collection: 'docs',
			where: [['uid', '==', `${props.firebase._.authUid}`]]
		}
	]
	}),
	connect(mapStateToProps)
)(Gallery)
