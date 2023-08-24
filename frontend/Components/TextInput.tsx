import React from 'react';
import {TextInput} from 'react-native';

const CustomTextInput = ({
  placeholder,
  styles,
  secureTextEntry,
  keyboardType,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
    />
  );
};

export default CustomTextInput;
