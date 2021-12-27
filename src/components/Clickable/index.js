import React from 'react';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

class Clickable extends React.Component {
	state = { press: false, width: 0, height: 0 };

	buttonSize = new Animated.Value(1);
	press_in_callback = null;
	__onPressIn = () => {
		if (this.props.loading) return;
		if (this.props.onPressIn) this.props.onPressIn();
		if(this.press_in_callback)
			clearTimeout(this.press_in_callback);
		this.press_in_callback = setTimeout(() => {
			if (this.props.onHold) this.props.onHold();	
		}, 250);
		Animated.spring(this.buttonSize, { toValue: this.props.animSize, speed: 25, useNativeDriver: true }).start();
	};

	__onPressOut = () => {
		if (this.props.loading) return;
		if (this.props.onPressOut) this.props.onPressOut();
		if(this.press_in_callback)
			clearTimeout(this.press_in_callback);
		Animated.spring(this.buttonSize, { toValue: 1, speed: 25, useNativeDriver: true }).start();
	};
	__onClick = () => {
		if (this.props.loading) return;
		if (this.props.onClick) this.props.onClick();
	};

	__onLayout = d => {
		if (
			!this.props.loading &&
			this.state.width === d.nativeEvent.layout.width &&
			this.state.height === d.nativeEvent.layout.height
		) return;
		this.setState({ width: d.nativeEvent.layout.width, height: d.nativeEvent.layout.height });
	};

	render() {
		const scale = this.buttonSize.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
		const scaleAnimation = { transform: [{ scale }] };
		const loader= this.props.loading?{opacity:0.8}:{opacity:1};
		return (
			<TouchableWithoutFeedback
				onPress={this.__onClick}
				onPressIn={this.__onPressIn}
				onPressOut={this.__onPressOut}
				onLayout={this.__onLayout}
				hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
			>
				<Animated.View style={[scaleAnimation,loader]}>
					{this.props.children}
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

Clickable.propTypes = {
	children: PropTypes.any,
	onClick: PropTypes.func,
	onPressIn: PropTypes.func,
	onPressOut: PropTypes.func,
	animSize: PropTypes.number,
	loading: PropTypes.bool,
	loadingBackgroundColor: PropTypes.string,
	loadingHighlightColor: PropTypes.string,
	loadingRadius: PropTypes.number
};
Clickable.defaultProps = {
	animSize: 0.8,
	loadingRadius: 5,
	loadingBackgroundColor: '#00000088',
	loadingHighlightColor: '#fff'
};

export { Clickable };
