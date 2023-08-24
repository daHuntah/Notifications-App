import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Login({navigation}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const doLogin = ({navigation}) => {
    if (username === '') {
      setalerts('Vui lòng nhập username');
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
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
          placeholder="Password"
          styles={styles.textInput}
          secureTextEntry={true}
          onChangeText={txt => setpassword(txt)}
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
