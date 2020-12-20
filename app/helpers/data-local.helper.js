export const ListLevel = [
  {id: 1, name: 'Gà mờ'},
  {id: 2, name: 'Bụng bia'},
  {id: 3, name: 'Dưỡng sinh'},
  {id: 4, name: 'Nghiệp dư'},
  {id: 5, name: 'Bán chuyên'},
  {id: 6, name: 'Chuyên nghiệp'},
];

export const ListPosition = [
  {id: 1, name: 'Thủ môn'},
  {id: 2, name: 'Hậu vệ'},
  {id: 3, name: 'Tiền vệ'},
  {id: 4, name: 'Tiền đạo'},
];

export const ListProvince = [
  {name: 'Hồ Chí Minh'},
  {name: 'Hà Nội'},
  {name: 'Đồng Nai'},
  {name: 'Đà Nẵng'},
  {name: 'Cần Thơ'},
  {name: 'An Giang'},
  {name: 'Vũng Tàu'},
  {name: 'Bắc Giang'},
  {name: 'Bắc Kạn'},
  {name: 'Bạc Liêu'},
  {name: 'Bắc Ninh'},
  {name: 'Bến Tre'},
  {name: 'Bình Định'},
  {name: 'Bình Dương'},
  {name: 'Bình Phước'},
  {name: 'Bình Thuận'},
  {name: 'Cà Mau'},
  {name: 'Cao Bằng'},
  {name: 'Đắk Lắk'},
  {name: 'Đắk Nông'},
  {name: 'Điện Biên'},
  {name: 'Đồng Tháp'},
  {name: 'Gia Lai'},
  {name: 'Hà Giang'},
  {name: 'Hà Nam'},
  {name: 'Hà Tĩnh'},
  {name: 'Hải Dương'},
  {name: 'Hải Phòng'},
  {name: 'Hậu Giang'},
  {name: 'Hòa Bình'},
  {name: 'Hưng Yên'},
  {name: 'Khánh Hòa'},
  {name: 'Kiên Giang'},
  {name: 'Kon Tum'},
  {name: 'Lai Châu'},
  {name: 'Lâm Đồng'},
  {name: 'Lạng Sơn'},
  {name: 'Lào Cai'},
  {name: 'Long An'},
  {name: 'Nam Định'},
  {name: 'Nghệ An'},
  {name: 'Ninh Bình'},
  {name: 'Ninh Thuận'},
  {name: 'Phú Thọ'},
  {name: 'Phú Yên'},
  {name: 'Quảng Bình'},
  {name: 'Quảng Nam'},
  {name: 'Quảng Ngãi'},
  {name: 'Quảng Ninh'},
  {name: 'Quảng Trị'},
  {name: 'Sóc Trăng'},
  {name: 'Sơn La'},
  {name: 'Tây Ninh'},
  {name: 'Thái Bình'},
  {name: 'Thái Nguyên'},
  {name: 'Thanh Hóa'},
  {name: 'Huế'},
  {name: 'Tiền Giang'},
  {name: 'Trà Vinh'},
  {name: 'Tuyên Quang'},
  {name: 'Vĩnh Long'},
  {name: 'Vĩnh Phúc'},
  {name: 'Yên Bái'},
];

export const listSeviceStadium = [
  {
    imgService: require('../assets/icons/energy_drink.png'),
    txtService: 'Nước uống',
  },
  {
    imgService: require('../assets/icons/jersey.png'),
    txtService: 'Áo thi đấu',
  },
  {
    imgService: require('../assets/icons/cleats.png'),
    txtService: 'Giày',
  },
  {
    imgService: require('../assets/icons/soccer_ball.png'),
    txtService: 'Bóng đá',
  },
  {
    imgService: require('../assets/icons/energy_drink.png'),
    txtService: 'Nước uống',
  },
];

export const listImageBanner = [
  {
    url: require('../assets/images/banner1.png'),
  },
  {
    url: require('../assets/images/banner4.png'),
  },
  {
    url: require('../assets/images/banner2.png'),
  },
  {
    url: require('../assets/images/banner3.png'),
  },
  // {
  //   url: require('../assets/images/banner5.png'),
  // },
];

export const listStatusOrder = [
  {key: 'ALL', name: 'Tất cả'},
  {key: 'ACCEPT', name: 'Đã xác nhận'},
  {key: 'WAITING', name: 'Chờ xác nhận'},
  {key: 'FINISH', name: 'Hoàn thành'},
  {key: 'REJECT', name: 'Đã hủy'},
];

export const listreasonCancelOrder = [
  'Đặt sai khung giờ',
  'Đặt sai ngày',
  'Đặt nhầm sân',
  'Có việc đột xuất ',
];

export const keyNoti = {
  ADD_MEMBER: 'ADD_MEMBER',
  DELETE_MEMBER: 'DELETE_MEMBER',
  ACCEPT_INVITE: 'ACCEPT_INVITE',
  CANCEL_MEMBER: 'CANCEL_MEMBER',
  ADD_ORDER: 'ADD_ORDER',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  FINISH: 'FINISH',
  JOIN_GAME: 'JOIN_GAME',
  ACCEPT_GAME: 'ACCEPT_GAME',
  REFUSEJOIN: 'REFUSEJOIN',
};
