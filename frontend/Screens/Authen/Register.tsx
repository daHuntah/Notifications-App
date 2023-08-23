import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Register({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../Assets/Image/logoNEWNCSC.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <CustomTextInput placeholder="Username" styles={styles.textInput} />
        <CustomTextInput placeholder="Email" styles={styles.textInput} keyboardType='email-address'/>
        <CustomTextInput
          placeholder="Số điện thoại"
          styles={styles.textInput}
        />
        <CustomTextInput
          placeholder="Password"
          styles={styles.textInput}
          secureTextEntry={true}
        />
        <Button
          content="ĐĂNG KÍ"
          btnstyle={styles.btnstyle}
          btntextstyle={styles.btntextstyle}
        />
        <View style={styles.RegNav}>
          <Text style={{fontSize: 15}}>Bạn đã có tài khoản ?</Text>
          <Button
            content=" Đăng nhập"
            btntextstyle={styles.RegNavtext}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Register;
