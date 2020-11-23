import RequestHelper from '../helpers/request.helper';
import {ADD_ORDER} from './api-url';

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
