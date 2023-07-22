import { PixelRatio } from 'react-native';
import { screenHeight, screenWidth } from '..';

const widthBaseScale = screenWidth / 414;
const heightBaseScale = screenHeight / 896;

const normalize = (size, based = 'width') => {
    const newSize =
        based === 'height' ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//for width  pixel
const widthPixel = size => {
    return normalize(size, 'width');
};
//for height  pixel
const heightPixel = size => {
    return normalize(size, 'height');
};
//for font  pixel
const fontPixel = size => {
    return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
    return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
    return widthPixel(size);
};

export {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
};

/**
 * Used above logic
 * 
 * 
const styles = StyleSheet.create({
 container: {
   paddingHorizontal: pixelSizeHorizontal(15),
   paddingVerticle: pixelSizeVertical(20),
   marginBottom: pixelSizeVertical(10),
   height: heightPixel(200),
   width: widthPixel(200),
 },
 
 title: {
   fontSize: fontPixel(18),
   paddingVerticle: pixelSizeVertical(10),
 },
}) 



 */
