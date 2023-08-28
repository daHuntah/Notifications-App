import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OTPInput = () => {
  const [otp, setOTP] = useState(['', '', '', '']);

  const handleInput = (index, value) => {
    if (value.length > 1) {
      return;
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value !== '' && index < otp.length - 1) {
      inputs[index + 1].focus();
    }
  };

  const inputs = Array(4)
    .fill()
    .map((_, index) => (
      <TextInput
        key={index}
        style={styles.input}
        value={otp[index]}
        onChangeText={value => handleInput(index, value)}
        keyboardType="numeric"
        maxLength={1}
        autoFocus={index === 0}
        ref={ref => (inputs[index] = ref)}
      />
    ));

  return <View style={styles.container}>{inputs}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default OTPInput;
