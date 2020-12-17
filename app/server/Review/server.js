import {PORT} from '../Port';
const axios = require('axios');
const API_AddReview = `http://${PORT}/review/add`;

export const AddReview = async props => {
  let data = JSON.stringify({
    stadiumId: props.stadiumId,
    content: props.content,
    rate: props.rating,
  });
  let config = {
    method: 'post',
    url: API_AddReview,
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  let response = await axios(config);
  return response.data;
};
