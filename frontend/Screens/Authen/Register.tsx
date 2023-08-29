import React, {useEffect, useState} from 'react';
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
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import CustomDialog from '../../Components/CustomDialog';

function Register({navigation}) {
  const [alerts, setalerts] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setisSpinning] = useState(false);

  const closeModal = () => {
    setIsLoading(false);
    handleSpinnings();
  };

  const handleSpinnings = () => {
    if (isLoading) {
      setisSpinning(false);
    } else if (!isLoading) {
      setisSpinning(true);
    }
  };

  const doRegister = async () => {
    const specChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
    const vnSpecChar =
      /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]/;

    if (username === '') {
      setalerts('Vui lòng nhập username');
      setIsLoading(true);
      return;
    } else if (
      specChar.test(username) ||
      /\s/.test(username) ||
      vnSpecChar.test(username)
    ) {
      setalerts('Username không được có kí tự đặc biệt');
      setIsLoading(true);
      return;
    } else if (password === '') {
      setalerts('Vui lòng nhập mật khẩu');
      setIsLoading(true);
      return;
    } else if (email === '') {
      setalerts('Vui lòng nhập email');
      setIsLoading(true);
      return;
    } else if (phonenumber === '') {
      setalerts('Vui lòng nhập số điẹn thoại');
      setIsLoading(true);
      return;
    } else {
      let urlReg =
        'https://848c-2001-ee0-41c1-4f53-fcc1-7d33-e7a5-b7f2.ngrok-free.app/auth/register';

      try {
        handleSpinnings();
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
          setIsLoading(true);
        } else if (responseData.status === 1) {
          navigation.navigate('Login', {username: username});
        }
      } catch (error) {
        console.log(error);
        setalerts('Vui lòng thử lại sau');
        setIsLoading(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomDialog visible={isLoading} alerts={alerts} onClose={closeModal} />
      <Image
        style={styles.logo2}
        source={require('../../Assets/Image/logo.png')}
        resizeMode="contain"
      />
      <KeyboardAvoidingView style={styles.formContainer} behavior="height">
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>ĐĂNG KÝ</Text>
            <ActivityIndicator
              size="small"
              color="#0f0856"
              animating={isSpinning}
              style={{marginLeft: 10}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text>Bạn đã có tài khoản ? </Text>
            <Button
              content="Đăng nhập"
              btntextstyle={{color: '#cc485e', fontWeight: 600}}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.label}>Username</Text>
            <CustomTextInput
              styles={styles.textInput}
              onChangeText={setusername}
            />
            <Text style={styles.label}>Số điện thoại</Text>
            <CustomTextInput
              styles={styles.textInput}
              keyboardType="numeric"
              onChangeText={setphonenumber}
            />
            <Text style={styles.label}>Email</Text>
            <CustomTextInput
              styles={styles.textInput}
              onChangeText={setemail}
            />
            <Text style={styles.label}>Password</Text>
            <CustomTextInput
              styles={styles.textInput}
              onChangeText={setpassword}
            />
          </View>
          <Button
            content="ĐĂNG KÝ"
            btnstyle={styles.btnLogin}
            btntextstyle={styles.btnLogintext}
            onPress={doRegister}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Register;
