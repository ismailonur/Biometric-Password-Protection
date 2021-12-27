import React from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

class SFImage extends React.Component {
	state = { WH: null };

	componentDidMount() {
		const { source, style, resizeMode, onSize, fi } = this.props;
		let { width, height } = this.props;
		let tmp;

		if (width && height) this.setState({ WH: { width, height } });
		else if (typeof source === 'object') {
			this.calculate_image_size();
		}
		else {
			const T = Image.resolveAssetSource(source);
			tmp = width ? { width, height: width * (T.height / T.width) } : { width: height * (T.width / T.height), height };

			this.setState({ WH: tmp });
			onSize(tmp);
		}
	}

	calculate_image_size = async () => {
		const { source, style, resizeMode, onSize, fi } = this.props;
		let { width, height } = this.props;
		let tmp;
		Image.getSize(source.uri,
			(ow, oh) => {
				tmp = width ? { width, height: width * (oh / ow) } : { width: height * (ow / oh), height };
				this.setState({ WH: tmp });
				onSize(tmp);
			}, (error) => {
				console.log({ error });
				//this.setState({WH:{width:1024,height:1024}});
				setTimeout(() => {
					this.calculate_image_size();
				}, 2000);
			});
	}


	render() {
		const { source, style, resizeMode, round } = this.props;
		let { width, height } = this.props;

		return this.state.WH ?
			<FastImage
				source={source}
				style={[this.state.WH, round && { borderRadius: 999 }, style]} resizeMode={resizeMode}
			/> :
			<View style={{ width, height }} />
			;
	}
}

SFImage.propTypes = { width: PropTypes.number, height: PropTypes.number, onSize: PropTypes.func, round: PropTypes.bool };
SFImage.defaultProps = { width: null, height: null, onSize: () => null, round: false };

export { SFImage };
