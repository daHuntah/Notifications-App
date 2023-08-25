import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({btnstyle, btntextstyle, onPress, content, disabled}) => {
  return (
    <TouchableOpacity style={btnstyle} onPress={onPress} disabled={disabled}>
      <Text style={btntextstyle}>{content}</Text>
    </TouchableOpacity>
  );
};

export default Button;
