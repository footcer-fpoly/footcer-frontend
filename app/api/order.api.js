import RequestHelper from '../helpers/request.helper';
import {
  ADD_ORDER,
  CANCEL_ORDER,
  GET_LIST_ORDER,
  GET_ORDER_DETAIL,
} from './api-url';

export const addOrderService = ({
  time,
  price,
  description,
  stadiumDetailsId,
  stadiumUserId,
}) => {
  return RequestHelper.post(ADD_ORDER, {
    time,
    price,
    description,
    stadiumDetailsId,
    stadiumUserId,
  });
};

export const getListOrderService = () => {
  return RequestHelper.get(GET_LIST_ORDER);
};
export const getOrderDetailService = (orderId) => {
  return RequestHelper.get(GET_ORDER_DETAIL(orderId));
};
export const cancelOrderService = (orderId, reason) => {
  return RequestHelper.put(CANCEL_ORDER, {orderId, status: 'REJECT', reason});
};
