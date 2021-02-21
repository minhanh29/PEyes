import React, { Component } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'

import Card from './Card'
import styles from './GalleryStyles'

class Gallery extends Component {
	renderItem = ({ item }) => (
		<Card {...item} />
	)

	goToPreview = async (id) => {
		try {
			// get the doc content with its id  (not uid)
			const doc = await firestore().collection('docs').doc(id).get();
			console.log("Doc", doc)
			this.props.navigation.navigate('Preview', {
				id,
				isUpdate: true,
				process: { text: doc._data.content }
			})
		} catch (e) {
			Alert.alert("Error", e.message)
		}
	}

	render() {
		const { docs } = this.props;
		const data = docs ? docs.map(doc => ({
			id: doc.id,
			title: doc.title,
			date: doc.date.toDate().toLocaleString(),
			goToPreview: this.goToPreview,
		})) : []

		return (
			<View style={styles.container}>
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
