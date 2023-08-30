import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import CustomDialog from '../../Components/CustomDialog';

function Login({navigation, route}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isloading, setisloading] = useState(false);
  const [isSpinning, setisSpinning] = useState(false);

  const closeModal = () => {
    setisloading(false);
    handleSpinnings();
  };

  const handleSpinnings = () => {
    if (isloading) {
      setisSpinning(false);
    } else if (!isloading) {
      setisSpinning(true);
    }
  };

  const doLogin = async () => {
    if (username === '') {
      setalerts('Vui lòng nhập username');
      setisloading(true);
      return;
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
      setisloading(true);
      return;
    }

    let urlLogin =
      'https://848c-2001-ee0-41c1-4f53-fcc1-7d33-e7a5-b7f2.ngrok-free.app/auth/login';

    try {
      handleSpinnings();
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
        setisloading(true);
      }
    } catch (error) {
      console.log(error);
      setalerts('Vui lòng thử lại sau');
      setisloading(true);
    }
  };

  useEffect(() => {
    if (route.params && route.params.username) {
      setusername(route.params.username);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomDialog visible={isloading} alerts={alerts} onClose={closeModal} />
      <Image
        style={styles.logo}
        source={require('../../Assets/Image/logo.png')}
        resizeMode="contain"
      />
      <KeyboardAvoidingView style={styles.formContainer} behavior="height">
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>ĐĂNG NHẬP</Text>
            <ActivityIndicator
              size="small"
              color="#0f0856"
              animating={isSpinning}
              style={{marginLeft: 10}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text>Bạn chưa có tài khoản ? </Text>
            <Button
              content="Đăng ký"
              btntextstyle={{color: '#cc485e', fontWeight: 600}}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.iconInput}>
              <CustomTextInput
                styles={styles.textInput}
                onChangeText={setusername}
                value={username}
              />
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.iconInput}>
              <CustomTextInput
                styles={styles.textInput}
                onChangeText={setpassword}
                secureTextEntry={true}
              />
            </View>
            <Button
              content="Quên mật khẩu"
              btnstyle={{alignSelf: 'flex-end'}}
              btntextstyle={{color: '#6d6b74', fontWeight: '600'}}
            />
          </View>
          <Button
            content="ĐĂNG NHẬP"
            btnstyle={styles.btnLogin}
            btntextstyle={styles.btnLogintext}
            onPress={doLogin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
