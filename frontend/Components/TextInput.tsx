import React from 'react';
import {TextInput} from 'react-native';

const CustomTextInput = ({placeholder, styles}) => {
  return <TextInput style={styles} placeholder={placeholder} />;
};

export default CustomTextInput;
