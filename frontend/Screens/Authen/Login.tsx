import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Login({navigation, route}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isloading, setisloading] = useState(false);

  const closeModal = () => {
    setisloading(false);
  };

  const doLogin = async () => {
    setisloading(true);

    if (username === '') {
      setalerts('Vui lòng nhập username');
      setisloading(false);
      return;
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
      setisloading(false);
      return;
    }

    let urlLogin =
      'https://8003-2001-ee0-41c1-4179-5d5b-d160-2abb-240d.ngrok-free.app/auth/login';

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
        navigation.navigate('Home');
      } else if (responseData.status === 2) {
        setalerts('Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      console.log(error);
      setalerts('Vui lòng thử lại sau');
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    if (route.params && route.params.username) {
      setusername(route.params.username);
    }
  }, [route.params]);

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
        <KeyboardAvoidingView style={styles.card}>
          <Text style={styles.alert}>{alerts}</Text>
          <View style={styles.label}>
            <Text style={{fontWeight: 700}}>Username:</Text>
          </View>
          <CustomTextInput
            styles={styles.textInput}
            onChangeText={setusername}
            value={username}
          />
          <View style={styles.label}>
            <Text style={{fontWeight: 700}}>Password:</Text>
          </View>
          <CustomTextInput
            styles={styles.textInput}
            secureTextEntry={true}
            onChangeText={setpassword}
          />
          <Button
            content="Quên mật khẩu ?"
            btnstyle={styles.forgotPass}
            btntextstyle={styles.forgotPasstext}
            onPress={() => navigation.navigate('ForgetPassInput')}
          />
          <Button
            content="ĐĂNG NHẬP"
            btnstyle={styles.btnstyle}
            btntextstyle={styles.btntextstyle}
            onPress={() => navigation.navigate('Home')}
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
        </KeyboardAvoidingView>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={isloading}
        onRequestClose={() => closeModal()}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Login;
