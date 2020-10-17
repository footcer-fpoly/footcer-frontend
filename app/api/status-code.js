export const StatusCode = {
  SUCCESS: 200,
  validPhone: {
    USER_EXISTS: 209, //Người dùng đã tồn tại => (cho phép đăng kí) || tồn tại nhưng pass null => updatePassword
    USER_IS_ADMIN: 203, //Người dùng đã là chủ sân
  },
  signInPhone: {
    PHONE_NUMBER_FAILED: 400, //Số điện thoại không đúng định dạng
    USER_EXISTS: 401, //Người dùng không tồn tại || Đăng nhập thất bại
  },
  checkUUID: {
    ALLOW_LOGIN: 409, //Cho phép Login
  },
};
