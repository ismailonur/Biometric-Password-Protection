import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { fonts_family, font_size } from '../../config/fonts';

class P extends React.Component {
	render() {
		let {
			children,
			color = '#000',
			size,
			type,
			align,
			flex,
			bold,
			lines,
			underline,
			underlineColor,
			tag,
			tagChar,
			tagColor,
			tagText,
			tagOnPress,
			letterSpacing,
		} = this.props;

		type = fonts_family[type];
		size = font_size[size];


		let textArray, length;
		if (tag) {
			textArray = tagText.split(' ');
			length = textArray.length;
		}

		const Component = (s, c, b, i) => {
			return (
				<Text
					key={i}
					style={[
						{
							color: c || color,
							textAlign: align,
							fontWeight: (bold || b) ? 'bold' : 'normal',
							flex,
							includeFontPadding: false,
							letterSpacing: letterSpacing,
							marginVertical: -3,
						},
						type,
						size,
						underline && { textDecorationLine: 'underline', textDecorationColor: underlineColor }
					]}
					numberOfLines={lines}
					onPress={tag ? d => tagOnPress(s, i, d) : undefined}
				>{s}</Text>
			);
		};

		return Component(
			tag ?
				textArray.map((d, i) => Component(
					`${d}${i < (length - 1) ? ' ' : ''}`,
					d[0] === tagChar ? tagColor : undefined,
					d[0] === tagChar,
					i
				)) :
				children,
			undefined,
			false,
			-1
		);
	}
}


P.propTypes = {
	children: PropTypes.any,
	color: PropTypes.string,
	size: PropTypes.string,
	align: PropTypes.string,
	flex: PropTypes.number,
	bold: PropTypes.bool,
	lines: PropTypes.number,
	type: PropTypes.string,
	display: PropTypes.object,
	underline: PropTypes.bool,
	underlineColor: PropTypes.string,
	tag: PropTypes.bool,
	tagChar: PropTypes.string,
	tagColor: PropTypes.string,
	tagOnPress: PropTypes.func,
	letterSpacing: PropTypes.number,
};
P.defaultProps = {
	children: '',
	color: '#000',
	size: 'm',
	align: 'left',
	flex: undefined,
	bold: false,
	lines: undefined,
	type: "MuktaMahee-Light",
	display: {},
	underline: false,
	tag: false,
	tagChar: '@',
	tagColor: 'red',
	letterSpacing: 0,
	tagOnPress: d => console.log('tagOnPress', d)
};


export { P };
