import {keyNoti} from '../helpers/data-local.helper';
import {
  GAME_DETAIL_SCREEN,
  NOTIFICATION_SCREEN,
  ORDER_DETAIL_SCREEN,
  TEAM_DETAIL_SCREEN,
} from '../navigations/route-name';
import colors from '../theme/colors';

export default function userHandleNoti(item) {
  switch (item?.key) {
    case keyNoti.ACCEPT_INVITE:
      return {
        iconName: 'account-group-outline',
        color: colors.main,
        navigate: TEAM_DETAIL_SCREEN,
        params: {teamID: item?.generalId},
      };
    case keyNoti.ADD_MEMBER:
      return {
        iconName: 'account-group-outline',
        color: colors.main,
        navigate: TEAM_DETAIL_SCREEN,
        params: {teamID: item?.generalId, flag: 1},
      };
    case keyNoti.CANCEL_MEMBER:
    case keyNoti.DELETE_MEMBER:
      return {
        iconName: 'account-group-outline',
        color: colors.red,
        navigate: NOTIFICATION_SCREEN,
        params: {},
      };
    case keyNoti.REJECT:
      return {
        iconName: 'book-open',
        color: colors.red,
        navigate: ORDER_DETAIL_SCREEN,
        params: {orderId: item?.generalId},
      };
    case keyNoti.ACCEPT:
    case keyNoti.FINISH:
      return {
        iconName: 'book-open',
        color: colors.main,
        navigate: ORDER_DETAIL_SCREEN,
        params: {orderId: item?.generalId},
      };
    case keyNoti.JOIN_GAME:
      return {
        iconName: 'sword-cross',
        color: colors.main,
        navigate: GAME_DETAIL_SCREEN,
        params: {gameId: item?.generalId},
      };
    case keyNoti.ACCEPT_GAME:
      return {
        iconName: 'sword-cross',
        color: colors.main,
        navigate: NOTIFICATION_SCREEN,
        params: {},
      };
    case keyNoti.REFUSEJOIN:
      return {
        iconName: 'sword-cross',
        color: colors.red,
        navigate: NOTIFICATION_SCREEN,
        params: {},
      };
    case keyNoti.REFUSE_GAME:
      return {
        iconName: 'sword-cross',
        color: colors.red,
        navigate: NOTIFICATION_SCREEN,
        params: {},
      };
    default:
      return;
  }
}
