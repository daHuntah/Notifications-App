import React from 'react';
import {TextInput} from 'react-native';

const CustomTextInput = ({placeholder, styles, secureTextEntry}) => {
  return <TextInput style={styles} placeholder={placeholder} secureTextEntry={secureTextEntry}/>;
};

export default CustomTextInput;
