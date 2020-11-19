import moment from 'moment';
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

export const formatCurrency = (value, n, x, s, c, unit) => {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = value.toFixed(Math.max(0, ~~n));

  return (
    (c ? num.replace('.', c) : num).replace(
      new RegExp(re, 'g'),
      '$&' + (s || ','),
    ) + (unit || '')
  );
};

export const formatDefaultVND = value => {
  return formatCurrency(value, 0, 3, '.', ',', ' vnđ');
};

export const formatCouponDateDisplay = couponDate => {
  return moment(couponDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
};

export const validURL = str => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

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
  var day = new Date();
  var nextDay = new Date(day);
  for (var i = 0; i <= nextDays; i++) {
    nextDay.setDate(day.getDate() + i);
    tempArr.push(
      dayjs(nextDay)
        .locale(locale_vi)
        .format('dddd, DD/MM/YYYY'),
    );
  }
  return tempArr;
};

export const diffHours = hour => {
  let date = new Date();
  date.setHours(date.getHours() + 7);
  date.toUTCString();
  const nowHours = dayjs(date.toUTCString())
    .locale(locale_vi)
    .format('HH:mm');
  const myHours = dayjs(hour)
    .locale(locale_vi)
    .format('HH:mm');
  return parseInt(myHours) - parseInt(nowHours);
};
