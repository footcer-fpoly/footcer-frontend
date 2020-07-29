import { PORT } from '../Port'

const API_CheckValidPhone = `http://${PORT}:4000/users/valid-phone`
const API_CheckValidEmail = `http://${PORT}:4000/users/valid-email`
const API_SignUpPhone = `http://${PORT}:4000/users/sign-up-phone`
const API_SignInPhone = `http://${PORT}:4000/users/sign-in-phone`

export const validatePhoneNumber = (phone) => {
    var regexp = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
    return regexp.test(phone)
}
export const checkValidPhone = async (phone) => {
    try {
        let response = await fetch(API_CheckValidPhone, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "phone": phone
            })
        });
        let resJson = await response.json();
        await console.log('status Code: ', resJson.code)
        return resJson.code;
    } catch (error) {
        console.error(error);
    }
}

export const checkValidEmail = async (email) => {
    try {
        let response = await fetch(API_CheckValidEmail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email
            })
        });
        let resJson = await response.json();
        return resJson.code
    } catch (error) {
        console.error(error);
    }
}

export const signUpPhone = async (user) => {
    try {
        let response = await fetch(API_SignUpPhone, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "phone": "0903173",
                "avatar": "/user/avatar.png",
                "password": "123456",
                "email": "oig29@gmail.com",
                "displayName": "Nguoi dung 29"
            })
        });
        let resJson = await response.json();
        await console.log('status Code: ', resJson.code)
        return resJson.code;
    } catch (error) {
        console.error(error);
    }
}
export const signInPhone = async (phone, pass) => {
    try {
        console.log(phone, pass)
        let response = await fetch(API_SignInPhone, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "phone": phone,
                "password": pass
            })
        });
        let resJson = await response.json();
        await console.log('status Code----: ', resJson.code)
        return resJson.code;
    } catch (error) {
        console.error(error);
    }
}