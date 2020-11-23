import RequestHelper from '../helpers/request.helper';
import {ADD_ORDER, GET_LIST_ORDER} from './api-url';

export const addOrderService = ({
  time,
  price,
  description,
  stadiumDetailsId,
}) => {
  return RequestHelper.post(ADD_ORDER, {
    time,
    price,
    description,
    stadiumDetailsId,
  });
};

export const getListOrderService = () => {
  return RequestHelper.get(GET_LIST_ORDER);
};
