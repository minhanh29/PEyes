import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { Avatar, Button, Divider } from 'react-native-paper'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { signOut } from '../../redux/actionCreators'
import styles from './AccountStyles'

import bg from '../../res/accountBg.png'
import avatar from '../../res/logo.png'

const Item = ({ icon, color, title, callback }) => (
	<TouchableOpacity style={styles.btnOption} onPress={callback}>
		<MaterialCommunityIcons
			name={icon}
			size={40}
			color={color}
		/>
		<Text style={styles.textOption}>{title}</Text>
		<Ionicons
			name="chevron-forward"
			size={25}
			color='gray'
			style={styles.arrow}
		/>
	</TouchableOpacity>
)

class Account extends Component {
	updateEmail = () => {
		this.props.navigation.navigate('UpdateEmail')
	}

	changePass = () => {
		this.props.navigation.navigate('ChangePass')
	}

	showAbout = () => {
		this.props.navigation.navigate('About')
	}

	signOut = () => {
		this.props.signOut()
	}

	render() {
		const { auth } = this.props;
		console.log(auth);
		const username = auth.email ? auth.email.split('@')[0] : 'undefined';
		return (
			<ScrollView>
				<View style={styles.container}>
					<Image source={bg} style={styles.bg} />

					<View style={styles.inforContainer}>
						<View style={styles.cardContainer}>
							<Avatar.Image source={avatar} style={styles.avatar} size={100} />
							<Text style={styles.textName}>{username}</Text>
							<Text style={styles.textSub}>Standard Account</Text>
							<Button
								mode='contained'
								dark={true}
								onPress={() => {}}
								style={styles.btnUpgrade}
							>Upgrade</Button>
						</View>

						<Text style={styles.settingLabel}>ACCOUNT SETTINGS</Text>

						<View style={styles.optionContainer}>
							<Item
								icon='email-sync'
								color='#74c23d'
								title='Update Default Email'
								callback={this.updateEmail}
							/>
							<View style={styles.divider}></View>
							<Item
								icon='form-textbox-password'
								color='#e82715'
								title='Change Password'
								callback={this.changePass}
							/>
							<View style={styles.divider}></View>
							<Item
								icon='information-outline'
								color='#ed8700'
								title='About PEyes'
								callback={this.showAbout}
							/>
							<View style={styles.divider}></View>
							<Item
								icon='logout'
								color='#0ba4db'
								title='Log Out'
								callback={this.signOut}
							/>
						</View>
					</View>

				</View>
			</ScrollView>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
})

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
