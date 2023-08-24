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

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, email, phonenumber}),
      });

      const data = await response.json();

      if (response.ok) {
        setalerts(data.message);
        navigation.navigate('Login');
      } else {
        setalerts(data.message);
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
          onChangeText={txt => setphonenumber(txt)}
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
