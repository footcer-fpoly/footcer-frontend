var dayjs = require('dayjs');
var locale_vi = require('dayjs/locale/vi');

export const regexPhoneNumber = /^0[0-9]{9}$/;

export const regexPhoneNumber2 = /^0[0-9]{9}$|^0[0-9]{10}$/;
export const regexpPhoneVn = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/;

export const regexFullName = /^[a-zA-Z0-9_ÀÁÂÃÈÉẾÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]{1,20}$/; //  /^[^-_\[\]{}()*\+=?.,\\\/^$|#~!@%&:;"\'`<>]+$/;//
export const regexEmail = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,30}))$/;
export const regexPhoneOrEmail = /^(?:0[0-9]{9}|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,30})))$/;
/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */


export const converSecondsToTime = seconds => {
  if (seconds) {
    return new Date(Number(seconds)).toUTCString().substring(16, 22);
  }
  return seconds;
};

export const detachedArray = (arr, size) => {
  if (arr) {
    var results = [];
    while (arr.length) {
      results.push(arr.splice(0, size));
    }
    return results;
  }
  return arr;
};

export const numberWithCommas = value => {
  if (!!value) {
    const str = value.toString();
    return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return value;
};

export const renderNextDays = nextDays => {
  let tempArr = [];
  for (let i = 0; i <= nextDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    tempArr.push(date.toString());
  }
  return tempArr;
};
export const formatDateTime = date => {
  return dayjs(date)
    .locale(locale_vi)
    .format('dddd, DD/MM/YYYY');
};
export const formatToDate = date => {
  return dayjs(date)
    .locale(locale_vi)
    .format('YYYY-MM-DD');
};

export const convertMilisecondsToMinutes = miliseconds => {
  return Number(miliseconds) / 60000;
};

export const diffHours = hour => {
  console.log(hour);
  let date = new Date();
  date.setHours(date.getHours() + 7);
  date.toUTCString();
  const nowHours = dayjs(date.toUTCString()).format('HH');
  const myHours = dayjs(hour).format('HH');
  return Number(myHours) - Number(nowHours);
};
