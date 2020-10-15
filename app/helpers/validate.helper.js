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
