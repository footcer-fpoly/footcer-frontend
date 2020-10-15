import {Dimensions} from 'react-native';
import colors from '../theme/colors';
import {scale} from '../helpers/size.helper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Styles = {
  container: {
    flex: 1,
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
  txtErr: {
    color: colors.error,
  },
  txtSuccess: {
    color: colors.success,
  },
  fontTitle: {
    fontSize: scale(28),
    fontWeight: 'bold',
  },
  fontTini: {
    fontSize: scale(13),
  },
  fontSmall: {
    fontSize: scale(18),
  },
  fontMedium: {
    fontSize: scale(20),
  },
  fontLarge: {
    fontSize: scale(25),
  },
  fontExtraLarge: {
    fontSize: scale(25),
  },
};

export default Styles;
