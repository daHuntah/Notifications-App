import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Register({navigation}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setIsLoading(false);
  };

  const doRegister = async () => {
    setIsLoading(true);

    const specChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
    const vnSpecChar =
      /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]/;

    if (username === '') {
      setalerts('Vui lòng nhập username');
      setIsLoading(false);
      return;
    } else if (
      specChar.test(username) ||
      /\s/.test(username) ||
      vnSpecChar.test(username)
    ) {
      setalerts('Username không được có kí tự đặc biệt');
      setIsLoading(false);
      return;
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
      setIsLoading(false);
      return;
    } else if (email === '') {
      setalerts('Vui lòng nhập email');
      setIsLoading(false);
      return;
    } else if (phonenumber === '') {
      setalerts('Vui lòng nhập số điẹn thoại');
      setIsLoading(false);
      return;
    } else {
      let urlReg =
        'https://8003-2001-ee0-41c1-4179-5d5b-d160-2abb-240d.ngrok-free.app/auth/register';

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

        if (responseData.status === 2) {
          setalerts('Username đã tồn tại');
        } else if (responseData.status === 1) {
          navigation.navigate('Login', {username: username});
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setalerts('Vui lòng thử lại sau');
      }
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
      <View style={styles.formContainerReg}>
        <KeyboardAvoidingView style={styles.card2}>
          <Text style={styles.alert}>{alerts}</Text>
          <View style={styles.label}>
            <Text style={{fontWeight: 700}}>Username:</Text>
          </View>
          <CustomTextInput
            styles={styles.textInput}
            onChangeText={setusername}
          />
          <View style={styles.label}>
            <Text style={{fontWeight: 700}}>Password:</Text>
          </View>
          <CustomTextInput
            styles={styles.textInput}
            keyboardType="email-address"
            onChangeText={setemail}
          />
          <View style={styles.label}>
            <Text style={{fontWeight: 700}}>Số điện thoại:</Text>
          </View>
          <CustomTextInput
            styles={styles.textInput}
            keyboardType="numeric"
            onChangeText={setphonenumber}
          />
          <View style={styles.label}>
            <Text style={{fontWeight: 700}}>Email:</Text>
          </View>
          <CustomTextInput
            styles={styles.textInput}
            secureTextEntry={true}
            onChangeText={setpassword}
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
              disabled={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => closeModal()}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Register;
