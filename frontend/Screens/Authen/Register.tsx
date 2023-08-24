import React, {useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Register({navigation}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const doRegister = async () => {
    if (username === '') {
      setalerts('Vui lòng nhập username');
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
    } else if (email === '') {
      setalerts('Vui lòng nhập email');
    } else if (phonenumber === '') {
      setalerts('Vui lòng nhập số điẹn thoại');
    }

    let urlReg = 'https://1c08-42-115-45-164.ngrok-free.app/auth/register';

    try {
      const response = await fetch(urlReg, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          phoneNumber: phonenumber,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === 409) {
        setalerts('Username đã tồn tại');
      } else if (responseData.status === 201) {
        setalerts('Thành công');
        navigation.navigate('Login');
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
          onChangeText={txt => setusername(txt)}
        />
        <CustomTextInput
          placeholder="Email"
          styles={styles.textInput}
          keyboardType="email-address"
          onChangeText={txt => setemail(txt)}
        />
        <CustomTextInput
          placeholder="Số điện thoại"
          styles={styles.textInput}
          keyboardType="numeric"
          onChangeText={txt => {
            const numericText = txt.replace(/[^0-9]/g, '');
            setphonenumber(numericText);
          }}
        />
        <CustomTextInput
          placeholder="Password"
          styles={styles.textInput}
          secureTextEntry={true}
          onChangeText={txt => setpassword(txt)}
        />
        <Button
          content="ĐĂNG KÍ"
          btnstyle={styles.btnstyle}
          btntextstyle={styles.btntextstyle}
          onPress={doRegister}
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
