import { Dimensions } from 'react-native';

const isTablet = () => {
    const { width, height } = Dimensions.get('screen');
    const minDim = Math.min(width, height);
    return minDim >= 600;
};

export default isTablet;
