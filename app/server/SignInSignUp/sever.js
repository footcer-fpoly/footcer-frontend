import {PORT} from '../Port';
const API_CheckValidPhone = `http://${PORT}:4000/users/valid-phone`;
// const API_CheckValidEmail = `http://${PORT}:4000/users/valid-email`
const API_CheckUUID = `http://${PORT}:4000/users/valid-uuid`;
const API_SignUpPhone = `http://${PORT}:4000/users/sign-up-phone`;
const API_SignInPhone = `http://${PORT}:4000/users/sign-in-phone`;
const API_SignUpFbGg = `http://${PORT}:4000/users/sign-in`;
const API_UpdatePass = `http://${PORT}:4000/users/change-password`;

export const validatePhoneNumber = phone => {
  if (phone.length === 10) {
    var regexp = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    if (regexp.test(phone)) {
      return false;
    } else {
      return 'Số điện thoại không đúng định dạng';
    }
  } else {
    return 'Số điện thoại gồm 10 kí tự';
  }
};

export const validatePassword = password => {
  if (password.length === 6) {
    return false;
  } else {
    return 'Mật khẩu gồm 6 kí tự';
  }
};

export const confirmPassword = (password, rePassword) => {
  if (password === rePassword) {
    return false;
  } else {
    return 'Mật khẩu không trùng nhau';
  }
};

export const checkValidPhone = async phone => {
  try {
    let response = await fetch(API_CheckValidPhone, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
      }),
    });
    let resJson = await response.json();
    return resJson;
  } catch (error) {
    console.error(error);
  }
};

export const checkUUID = async uuid => {
  try {
    let response = await fetch(API_CheckUUID, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: uuid,
      }),
    });
    let resJson = await response.json();
    return resJson;
  } catch (error) {
    console.error(error);
  }
};

export const signUpPhone = async data => {
  try {
    let response = await fetch(API_SignUpPhone, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone,
        avatar: '/user/avatar.png',
        password: data.password,
        displayName: data.name,
      }),
    });
    let resJson = await response.json();
    return resJson;
  } catch (error) {
    console.error(error);
  }
};
export const signInPhone = async (phone, pass) => {
  try {
    let response = await fetch(API_SignInPhone, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        password: pass,
      }),
    });
    let resJson = await response.json();
    return resJson;
  } catch (error) {
    console.error(error);
  }
};
export const signUpFbGg = async data => {
  try {
    let response = await fetch(API_SignUpFbGg, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone,
        avatar: data.image,
        displayName: data.name,
        userId: data.id,
      }),
    });
    let resJson = await response.json();
    return resJson;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (phone, password) => {
  try {
    let response = await fetch(API_UpdatePass, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    });
    let resJson = await response.json();
    return resJson.code;
  } catch (error) {
    console.error(error);
  }
};
