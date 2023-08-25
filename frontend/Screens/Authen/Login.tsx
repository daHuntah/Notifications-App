import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Login({navigation, route}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    if (route.params && route.params.username) {
      setusername(route.params.username);
    }
  }, [route.params]);

  const doLogin = async () => {
    if (username === '') {
      setalerts('Vui lòng nhập username');
      return;
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
      return;
    }

    let urlLogin = 'https://c7f4-42-115-45-164.ngrok-free.app/auth/login';

    try {
      const response = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === 1) {
        await AsyncStorage.setItem('token', responseData.data.accessToken);
        navigation.navigate('NotifiScreen');
      } else if (responseData.status === 2) {
        setalerts('Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        <Text style={styles.alert}>{alerts}</Text>
        <CustomTextInput
          placeholder="Username"
          styles={styles.textInput}
          onChangeText={setusername}
          value={username}
        />
        <CustomTextInput
          placeholder="Password"
          styles={styles.textInput}
          secureTextEntry={true}
          onChangeText={setpassword}
        />
        <Button
          content="Quên mật khẩu ?"
          btnstyle={styles.forgotPass}
          btntextstyle={styles.forgotPasstext}
        />
        <Button
          content="ĐĂNG NHẬP"
          btnstyle={styles.btnstyle}
          btntextstyle={styles.btntextstyle}
          onPress={doLogin}
        />
        <View style={styles.RegNav}>
          <Text style={{fontSize: 15}}>Bạn chưa có tài khoản ?</Text>
          <Button
            content=" Đăng kí"
            btntextstyle={styles.RegNavtext}
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
