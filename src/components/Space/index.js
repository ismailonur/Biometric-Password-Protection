import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { W, H } from '~dimensions';

class Space extends React.Component {
	render() {
		return (
			<View style={[this.get_styles(), this.props.debug && { borderWidth: 1, borderColor: this.props.debug }]}>
				{this.props.children}
			</View>
		);
	}
	get_styles = () => {
		let { v, h, percentage, flex } = this.props;

		let style = percentage ?
			[styles_percentage[`v_${v}`], styles_percentage[`h_${h}`], { flex }, this.props.style] :
			[styles[`v_${v}`], styles[`h_${h}`], { flex }, this.props.style];

		return style;
	};
}

const styles = StyleSheet.create({
	v_n: { paddingVertical: 0 },
	v_xxs: { paddingVertical: 2 },
	v_xs: { paddingVertical: 4 },
	v_s: { paddingVertical: 10 },
	v_m: { paddingVertical: 20 },
	v_l: { paddingVertical: 40 },
	h_n: { paddingHorizontal: 0 },
	h_xxs: { paddingHorizontal: 2 },
	h_xs: { paddingHorizontal: 4 },
	h_s: { paddingHorizontal: 10 },
	h_m: { paddingHorizontal: 20 },
	h_l: { paddingHorizontal: 40 },
	h_xl: { paddingHorizontal: 60 },
	h_xxl: { paddingHorizontal: 80 }
});
const styles_percentage = StyleSheet.create({
	v_n: { paddingVertical: 0 },
	v_xxs: { paddingVertical: H(0.3) },
	v_xs: { paddingVertical: H(0.6) },
	v_s: { paddingVertical: H(1.2) },
	v_m: { paddingVertical: H(2.4) },
	v_l: { paddingVertical: H(4.8) },
	h_n: { paddingHorizontal: 0 },
	h_xxs: { paddingHorizontal: W(0.5) },
	h_xs: { paddingHorizontal: W(1) },
	h_s: { paddingHorizontal: W(2) },
	h_m: { paddingHorizontal: W(4) },
	h_l: { paddingHorizontal: W(8) },
	h_xl: { paddingHorizontal: W(10) },
	h_xxl: { paddingHorizontal: W(12) }
});


Space.propTypes = {
	children: PropTypes.any,
	style: ViewPropTypes.style,
	v: PropTypes.string,
	h: PropTypes.string,
	percentage: PropTypes.bool,
	flex: PropTypes.number,
	debug: PropTypes.string
};
Space.defaultProps = {
	children: null,
	style: {},
	v: 'm',
	h: 'm',
	percentage: true,
	flex: undefined,
	debug: null
};

export { Space };
