import React from 'react';
import {TextInput} from 'react-native';

const CustomTextInput = ({placeholder, styles, secureTextEntry, keyboardType}) => {
  return <TextInput style={styles} placeholder={placeholder} secureTextEntry={secureTextEntry} keyboardType={keyboardType}/>;
};

export default CustomTextInput;
