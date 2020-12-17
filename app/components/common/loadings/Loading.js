import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

const Loading = ({loading}) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner isVisible={true} size={80} type={'Circle'} color={'white'} />
      </View>
    );
  }
  return <View />;
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    zIndex: 9999,
  },
});

function mapStateToProps(state) {
  return {
    loading: state.loadingState.loading,
  };
}

export default connect(mapStateToProps, null)(Loading);
