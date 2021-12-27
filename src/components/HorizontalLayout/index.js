import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';


class HorizontalLayout extends React.Component {
	render() {
		return (
			<View style={[this.get_styles(), this.props.style]}>
				{this.props.children}
			</View>
		);
	}

	get_styles = () => {
		let { center, adjust, spread, end, top } = this.props;

		let style = [styles.layout];
		if (top) style.push(styles.top);
		if (center) style.push(styles.center);
		if (adjust) style.push(styles.adjust);
		if (spread) style.push(styles.spread);
		if (end) style.push(styles.end);

		return style;
	}
}

const styles = StyleSheet.create({
	layout: { flexDirection: 'row', alignItems: 'center' },
	top: { alignItems: 'flex-start' },
	center: { justifyContent: 'center' },
	adjust: { justifyContent: 'space-evenly' },
	spread: { justifyContent: 'space-between' },
	end: { justifyContent: 'flex-end' },
});

HorizontalLayout.propTypes = {
	children: PropTypes.any,
	center: PropTypes.bool,
	adjust: PropTypes.bool,
	spread: PropTypes.bool,
	end: PropTypes.bool,
	top: PropTypes.bool,
	style: ViewPropTypes.style
};
HorizontalLayout.defaultProps = {
	children: null,
	center: false,
	adjust: false,
	spread: false,
	end: false,
	top: false,
	style: {}
};

export { HorizontalLayout };
