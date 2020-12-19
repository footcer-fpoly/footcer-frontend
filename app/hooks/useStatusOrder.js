import colors from '../theme/colors';

export default function useStatusOrder(status) {
  switch (status) {
    case 'ACCEPT':
      return {bgColor: colors.green, text: 'Đã xác nhận'};
    case 'WAITING':
      return {bgColor: colors.yellowDark, text: 'Chờ xác nhận'};
    case 'REJECT':
      return {bgColor: colors.red, text: 'Đã hủy'};
    case 'FINISH':
      return {bgColor: colors.gray, text: 'Đã hoàn thành'};
  }
}
