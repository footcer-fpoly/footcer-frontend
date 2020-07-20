import React, {Component} from 'react';
import {Text, SafeAreaView, View, Image,StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class item extends Component {
  render() {
    const {urlImg, name, location, time, range} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image source={{uri: urlImg}} />
          </View>
          <View style={styles.textName}>
            <Text style={styles.textStyle}>{name}</Text>
            <View style={styles.viewAddress}>
              <FontAwesome5 name="map-marker-alt" size={15} color="red" />
              <Text style={styles.textAddress}>{location}</Text>
            </View>

            <View style={styles.viewTime}>
              <FontAwesome5 name="clock" size={15} color="black" />
              <Text style={styles.textAddress}>
                {time}p - {range}km
              </Text>
            </View>
          </View>
           
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 414,
    height: 100,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: 'black',
  },
  content: {
    marginHorizontal: 5,
  },
  textName: {
    marginHorizontal: 16,
  },
  textStyle: {
    fontSize: 16,
    color: '#0AB134',
    marginBottom: 10,
  },
  viewAddress: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textAddress: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 5,
  },
  viewTime: {
    flexDirection: 'row',
  },
});
