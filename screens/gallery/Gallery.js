import React, { Component } from 'react'
import { View, FlatList, Alert, Text, Image } from 'react-native'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Appbar } from 'react-native-paper'

import { createDoc } from '../../redux/actionCreators'

import Card from './Card'
import styles from './GalleryStyles'
import logo from '../../res/logoWhite.png'

class Gallery extends Component {
	state = {
		selection: false,
		isDeleted: false,
		selectCount: 0,
	}

	toggleSelection = () => {
		this.setState(prev => ({
			selection: !prev.selection,
		}))
	}

	selectItem = () => {
		const count = this.state.selectCount + 1;
		this.setState({
			selectCount: count,
		})
	}

	deselectItem = () => {
		const count = this.state.selectCount - 1;
		this.setState({
			selectCount: count,
		})
	}

	deleteItem = () => {
		this.setState({ isDeleted: true })
	}

	renderItem = ({ item }) => (
		<Card {...item}
			selection={this.state.selection}
			isDeleted={this.state.isDeleted}
			toggleSelect={this.toggleSelection}
			select={this.selectItem}
			deselect={this.deselectItem}
		/>
	)

	goToPreview = (id) => {
		try {
			// get the doc content with its id  (not uid)
			const doc = this.props.docs.filter(doc => doc.id === id).pop()
			this.props.createDoc({
				id,
				isUpdate: true,
				title: doc.title,
				process: { text: doc.content },
			})
			this.props.navigation.navigate('Preview')
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

		const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

		// detetion
		const disableDelete = this.state.selectCount <= 0;

		return (
			<View style={styles.container}>
				{this.state.selection ?
				<View style={styles.header}>
					<Appbar.Content />
					<Appbar.Action disabled={disableDelete} icon="delete" color='white' onPress={() => {}} />
				</View> :
				<View style={styles.header}>
					<Image source={logo} style={styles.logo} />
					<Appbar.Content title="PEyes" subtitle="CS Zone" color='white' />

					<Appbar.Action icon="magnify" color='white' onPress={() => {}} />
					<Appbar.Action icon={MORE_ICON} color='white' onPress={() => {}} />
				</View>
				}

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

const mapDispatchToProps = (dispatch) => ({
	createDoc: payload => dispatch(createDoc(payload)),
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
	connect(mapStateToProps, mapDispatchToProps)
)(Gallery)
