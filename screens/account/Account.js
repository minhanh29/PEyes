import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { signOut } from '../../redux/actionCreators'

class Account extends Component {
	signOut = () => {
		this.props.signOut()
	}

	render() {
		return (
			<View>
				<Text>Account</Text>

				<TouchableOpacity onPress={this.signOut}>
					<Text>Sign Out</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
