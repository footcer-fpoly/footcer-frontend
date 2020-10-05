import { PORT } from '../Port'
import axios from 'axios'
const API_GetProfileUser = `http://${PORT}/users/profile`
const API_SearchPhoneUser = `http://${PORT}/team/search-phone`

export const getInforUser = async (token) => {
    try {
        const res = await axios.get(API_GetProfileUser, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res) {
            return res.data;
        } return false
    } catch (error) {

    }
}

export const searchPhoneUser = async (token, phone) => {
    try {
        const res = await axios.post(API_SearchPhoneUser,
            { "phone": phone },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        if (res) {
            return res.data;
        } return false
    } catch (error) {
        console.log(error);
    }
}



