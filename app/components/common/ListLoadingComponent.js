import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../helpers/size.helper';
import ContentPlaceholder from '../placeholder/ContentPlaceholder';
import NoDataComponent from './NoDataComponent';

export default function ListLoadingComponent({
  onReady,
  numberOfPlaceholder,
  text,
}) {
  const renderPlaceholder = () => {
    const numberOfArray = numberOfPlaceholder ?? 3;
    return new Array(numberOfArray).fill(0).map((_, index) => (
      <View key={index.toString()}>
        <ContentPlaceholder />
        <View style={styles.spacing} />
      </View>
    ));
  };

  if (onReady) {
    return (
      <View style={styles.container}>
        <NoDataComponent text={text} />
      </View>
    );
  }
  return <View style={styles.container}>{renderPlaceholder()}</View>;
}

const styles = StyleSheet.create({
  container: {width: scale(344)},
  spacing: {height: 20},
});
