import moment from 'moment';

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
