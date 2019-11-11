import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import {
	getNetworkKeyBySubstratePath,
	getPathName,
	isSubstratePath
} from '../util/identitiesUtils';
import { NETWORK_LIST } from '../constants';
import Separator from '../components/Separator';
import AccountIcon from './AccountIcon';
import Address from './Address';
import colors from '../colors';
import fontStyles from '../fontStyles';

PathCard.propTypes = {
	identity: PropTypes.object.isRequired,
	onPress: PropTypes.func,
	path: PropTypes.string.isRequired,
	testID: PropTypes.string
};

export default function PathCard({ onPress, identity, path, testID }) {
	const pathName = getPathName(path, identity);
	const address = identity.meta.get(path).address;

	const networkKey = getNetworkKeyBySubstratePath(path);
	const network = NETWORK_LIST[networkKey];

	return (
		<View testID={testID}>
			<Separator
				shadow={true}
				style={{
					backgroundColor: 'transparent',
					height: 0,
					marginVertical: 0
				}}
			/>
			<View style={styles.content}>
				<AccountIcon
					address={address}
					protocol={network.protocol}
					network={network}
					style={styles.icon}
				/>
				<View style={styles.desc}>
					<View>
						<Text style={[fontStyles.t_regular, { color: colors.bg_text_sec }]}>
							{network.title}
						</Text>
					</View>
					<Text numberOfLines={1} style={[fontStyles.h2, { marginTop: -2 }]}>
						{pathName}
					</Text>
					{isSubstratePath(path) && <Button onPress={onPress} title={path} />}
					<Address address={address} protocol={network.protocol} />
				</View>
				<View
					style={[
						styles.footer,
						{
							backgroundColor: network.color
						}
					]}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		alignItems: 'center',
		backgroundColor: colors.bg,
		flexDirection: 'row',
		paddingLeft: 16
	},
	desc: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: 16
	},
	footer: {
		alignSelf: 'stretch',
		backgroundColor: '#977CF6',
		height: 100,
		marginLeft: 8,
		width: 8
	},
	icon: {
		height: 40,
		width: 40
	}
});
