import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({btnstyle, btntextstyle, onPress, content}) => {
  return (
    <TouchableOpacity style={btnstyle} onPress={onPress}>
      <Text style={btntextstyle}>{content}</Text>
    </TouchableOpacity>
  );
};

export default Button;
