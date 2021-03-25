import React, { Component } from 'react'
import { View, FlatList, Alert, Image  } from 'react-native'
import { firestoreConnect } from 'react-redux-firebase'
import firestore from '@react-native-firebase/firestore'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Appbar, Searchbar } from 'react-native-paper'

import { createDoc } from '../../redux/actionCreators'

import Card from './Card'
import styles from './GalleryStyles'
import logo from '../../res/logoWhite.png'

class Gallery extends Component {
	state = {
		selection: false,
		isDeleted: false,
		selectCount: 0,
		searching: false,
		query: '',
	}

	toggleSelection = () => {
		let count = this.state.selectCount
		if (this.state.selection)
			count = 0;

		this.setState(prev => ({
			selection: !prev.selection,
			selectCount: count,
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
		if (count <= 0)
			this.resetSelection()
		else
			this.setState({ selectCount: count })
	}

	resetSelection = () => {
		this.setState({
			selection: false,
			isDeleted: false,
			selectCount: 0,
		})
	}

	deleteItem = () => {
		this.setState({ isDeleted: true })
	}

	deleteMe = (id) => {
		firestore()
			.collection('docs')
			.doc(id)
			.delete()
			.then(() => {
				this.deselectItem()
				console.log("Item deleted")
			})
	}

	renderItem = ({ item }) => (
		<Card {...item}
			selection={this.state.selection}
			isDeleted={this.state.isDeleted}
			toggleSelect={this.toggleSelection}
			select={this.selectItem}
			deselect={this.deselectItem}
			deleteMe={this.deleteMe}
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

	toggleSearch = () => {
		this.setState(prev => ({
			searching: !prev.searching,
			query: '',
		}))
	}

	render() {
		const { docs } = this.props;
		let data = docs ? docs.map(doc => ({
			id: doc.id,
			title: doc.title,
			date: doc.date.toDate().toLocaleString(),
			goToPreview: this.goToPreview,
		})) : []

		// search bar
		if (this.state.searching)
		{
			const query = this.state.query.toUpperCase()
			data = data.filter(item => {
				const title = item.title.toUpperCase()
				if (title.indexOf(query) > -1)
					console.log("Got", title)
				return title.indexOf(query) > -1
			})
		}

		const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

		// detetion
		const disableDelete = this.state.selectCount <= 0;
		console.log("count", this.state.selectCount)

		return (
			<View style={styles.container}>
				{this.state.selection ?
				<View style={styles.header}>
					<Appbar.Action icon="keyboard-backspace" color='white' onPress={this.resetSelection} />
					<Appbar.Content title='Select your files' />
					<Appbar.Action disabled={disableDelete} icon="delete" color='white' onPress={this.deleteItem} />
				</View> :
				<View style={styles.header}>
					<Image source={logo} style={styles.logo} />
					<Appbar.Content title="PEyes" subtitle="CS Zone" color='white' />

					{this.state.searching ?
						<Searchbar style={styles.searchbar}
							onBlur={this.toggleSearch}
							onChangeText={query => this.setState({ query })}
							value={this.state.query}
							/> :
						<Appbar.Action icon="magnify" color='white' onPress={this.toggleSearch} />
					}
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
