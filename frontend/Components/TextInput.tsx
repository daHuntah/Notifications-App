import React from 'react';
import {TextInput} from 'react-native';

const CustomTextInput = props => {
  return (
    <TextInput
      style={props.styles}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      value={props.value}
    />
  );
};

export default CustomTextInput;
