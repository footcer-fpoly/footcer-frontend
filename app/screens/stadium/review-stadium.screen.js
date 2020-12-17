import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {reviewStadiumService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import Avatar from '../../components/common/Avatar';
import PrimaryButton from '../../components/common/PrimaryButton';
import {body3, headline4, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale, verticalScale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import {STADIUM_SCREEN} from '../../navigations/route-name';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import colors from '../../theme/colors';

const ReviewStadiumScreen = ({route, showLoading, hideLoading}) => {
  const {item} = route.params;
  const [review, setReview] = useState({
    content: '',
    star: 5,
  });
  const addReview = async () => {
    try {
      showLoading();
      const res = await reviewStadiumService({
        stadiumId: item.stadiumId,
        content: review.content,
        rate: review.star,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
        ToastHelper.showToast('Gữi đánh giá thành công');
      }
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  const handleOnPress = () => {
    rootNavigator.back();
  };
  const renderToolBar = () => {
    return (
      <ToolBar
        style={styles.toolBar}
        left={
          <TouchableOpacity style={styles.btnBack} onPress={handleOnPress}>
            <Icon name="chevron-left" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
        center={
          <Text type={headline5} style={styles.titleContent}>
            Đánh giá sân bóng
          </Text>
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      {renderToolBar()}
      <ScrollView contentContainerStyle={styles.reviewContainer}>
        <Avatar image={item.image} size={scale(150)} />
        <Text type={headline4} style={styles.txtName}>
          {item.stadiumName}
        </Text>
        <View style={styles.warpperLocation}>
          <Icon name="place" color="#FF0000" size={scale(25)} />
          <Text type={body3} style={styles.txtAddress}>
            {item.address}
          </Text>
        </View>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={review.star}
          selectedStar={(rating) => setReview({...review, star: rating})}
          fullStarColor={colors.yellow}
        />
        <View style={styles.warpperInput}>
          <Text type={body3} style={styles.labelStyle}>
            Đánh giá của bạn
          </Text>
          <TextInput
            onChangeText={(value) => setReview({...review, content: value})}
            placeholder="Hãy nhập đánh giá của bạn"
            multiline={true}
            underlineColorAndroid={colors.transparent}
            textAlignVertical={'top'}
            style={styles.inputStyle}
          />
          <Text style={styles.txtCountValue}>{review.content?.length}/300</Text>
        </View>
        <PrimaryButton onPress={addReview} title="Gửi đánh giá" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  toolBar: {
    backgroundColor: colors.main,
  },
  titleContent: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  reviewContainer: {
    padding: scale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
  },

  txtName: {
    color: colors.orange,
    marginTop: scale(10),
  },
  warpperLocation: {
    ...Styles.columnCenter,
    marginTop: scale(10),
    marginBottom: scale(20),
    width: '100%',
  },
  txtAddress: {
    paddingLeft: scale(5),
    textAlign: 'center',
  },

  inputStyle: {flex: 1, padding: scale(10), fontSize: scale(12)},
  labelStyle: {
    position: 'absolute',
    paddingLeft: 5,
    paddingRight: 10,
    top: 0,
    left: scale(14),
    backgroundColor: colors.white,
    transform: [
      {
        translateX: scale(10),
      },
      {
        translateY: scale(-11),
      },
    ],
  },
  warpperInput: {
    borderWidth: 1,
    height: verticalScale(140),
    borderColor: 'rgba(12, 42, 100, 0.2)',
    marginBottom: verticalScale(20),
    backgroundColor: colors.white,
    borderRadius: scale(8),
    paddingVertical: scale(10),
    width: '100%',
    marginTop: scale(20),
  },
  txtCountValue: {
    textAlign: 'right',
    paddingRight: scale(10),
    color: 'rgba(12, 42, 100, 0.4)',
  },
});
const mapDispatchToProps = {
  showLoading,
  hideLoading,
};

export default connect(null, mapDispatchToProps)(ReviewStadiumScreen);
