import {Dimensions} from 'react-native';
import colors from '../theme/colors';
import {scale} from '../helpers/size.helper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Styles = {
  flex1: {
    flex: 1,
  },
  flex32: {
    flex: 0.32,
  },
  flex49: {
    flex: 0.49,
  },
  windowWidth: {
    width: windowWidth,
  },
  windowHeight: {
    height: windowHeight,
  },
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  borderRadiusCircle: diameter => {
    return {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
    };
  },
  borderColor: (color, width) => {
    return {
      borderWidth: width,
      borderColor: color,
    };
  },
  txtErr: {
    color: colors.error,
  },
  txtSuccess: {
    color: colors.success,
  },
};

export default Styles;
