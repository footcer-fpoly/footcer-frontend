import {PORT} from '../Port';
const axios = require('axios');
const API_SearchLocation = `http://${PORT}/stadium/search-location`;

export const GetStadiumLocation = async props => {
  try {
    let response = await axios.get(API_SearchLocation, {
      params: {
        latitude: props.latitude,
        longitude: props.longitude,
      },
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const GetStadiumID = async props => {
  const API_SearchID = `http://${PORT}/stadium/info-id/${props.stadiumId}`;
  try {
    let response = await axios.get(API_SearchID, {
      // params: {
      //   stadiumId: props.stadiumId,
      // },
      headers: {
        Authorization: `Bearer ${props.userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
