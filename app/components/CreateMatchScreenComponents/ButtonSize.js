import React, {useState} from 'react';
import {View, Picker} from 'react-native';

const App = () => {
  const [selectedValue, setSelectedValue] = useState('5');
  return (
    <View>
      <Picker
        mode={'dropdown'}
        selectedValue={selectedValue}
        style={{width: 110, height: 20, marginLeft: -5}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="5 vs 5" value="5" />
        <Picker.Item label="7 vs 7" value="7" />
      </Picker>
    </View>
  );
};

export default App;
