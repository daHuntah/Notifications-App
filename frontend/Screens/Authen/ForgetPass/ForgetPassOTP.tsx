import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInput from '../../../Components/OTPInput';
import styles from './styles';
import Button from '../../../Components/Button';

function ForgetPassOTP() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.card}>
        <View style={styles.textContainer2}>
          <Text style={styles.text2}>Vui lòng nhập mã được gửi trong Email của bạn</Text>
        </View>
        <OTPInput />
        <Button
          content="Xác nhận"
          btnstyle={styles.btn2}
          btntextstyle={styles.btnText}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgetPassOTP;
