import {Dimensions} from 'react-native';
import {getStatusBarHeight} from '../helpers/device.helper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const statusbarHeight = getStatusBarHeight(true);

export default {
  /**
   * App level constants
   */
  WINDOW_WIDTH: screenWidth,
  WINDOW_HEIGHT: screenHeight,
  STATUS_BAR_HEIGHT: statusbarHeight,
  TOOL_BAR_HEIGHT: 44,
};
