'use strict';
exports.checkMobilePhoneNumber = (tel) => {
  return tel.match(/[+]*9936[0-5]\d{1,6}$/gm);
};

exports.formatMobilePhoneNumber = (phone) => {
  phone = phone?.replaceAll(' ', '');
  if (!phone) return phone;

  if (phone.match(/^86[0-5]\d{1,6}$/gm)) {
    phone = `+993${phone.split('').splice(1).join('')}`;
  } else if (phone.match(/^6[0-5]\d{1,6}$/gm) && phone.length === 8) {
    phone = `+993${phone}`;
  } else if (phone.match(/^9936[0-5]\d{1,6}$/gm)) {
    phone = `+${phone}`;
  }
  return phone;
};

exports.toSimpleString = (phoneNumber) => {
  return phoneNumber.replace(/[\+\-\s]/g, '');
};
