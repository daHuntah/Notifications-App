import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../../Components/TextInput';
import styles from './styles';
import Button from '../../../Components/Button';

function ForgetPassInput({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Vui lòng nhập địa chỉ Email</Text>
        </View>
        <CustomTextInput placeholder="example@abc.com" styles={styles.textIP} />
        <Button
          btnstyle={styles.btn}
          btntextstyle={styles.btnText}
          content="Gửi mã"
          onPress={() => navigation.navigate('ForgetPassOTP')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgetPassInput;
