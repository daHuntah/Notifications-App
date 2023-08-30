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
import Icon from 'react-native-vector-icons/Octicons';
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
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const specChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
  const vnSpecChar =
    /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]/;

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

  const validateUsername = input => {
    setIsUsernameValid(
      input !== '' &&
        !specChar.test(input) &&
        !/\s/.test(input) &&
        !vnSpecChar.test(input),
    );
  };

  const validatePassword = input => {
    setIsPasswordValid(
      input !== '' &&
        !/\s/.test(input) &&
        !vnSpecChar.test(input) &&
        input.length >= 8,
    );
  };

  const validatePhoneNumber = input => {
    setIsPhoneNumberValid(
      input !== '' &&
        !specChar.test(input) &&
        !/\s/.test(input) &&
        !vnSpecChar.test(input) &&
        !/[a-zA-Z]/.test(input) && // Không chứa chữ cái
        /^[0-9]+$/.test(input) && // Chỉ chứa số
        input.length >= 10 && // Độ dài ít nhất 10 ký tự
        input.length <= 12, // Độ dài tối đa 12 ký tự
    );
  };

  const validateEmail = input => {
    // Sử dụng một biểu thức chính quy đơn giản để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(input !== '' && emailRegex.test(input));
  };

  const doRegister = async () => {
    if (!isUsernameValid) {
      setalerts('Vui lòng kiểm tra username');
      setIsLoading(true);
      return;
    } else if (!isPhoneNumberValid) {
      setalerts('Vui lòng kiểm tra số điện thoại');
      setIsLoading(true);
      return;
    } else if (!isEmailValid) {
      setalerts('Vui lòng kiểm tra email');
      setIsLoading(true);
      return;
    } else if (!isPasswordValid) {
      setalerts('Vui lòng kiểm tra mật khẩu');
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
            <View style={styles.iconInput}>
              <CustomTextInput
                styles={styles.textInput}
                onChangeText={txt => {
                  setusername(txt);
                  validateUsername(txt);
                }}
                placeholder="abc"
              />
              {isUsernameValid ? (
                <Icon name="check" size={20} color={'#342e9d'} />
              ) : (
                <Icon name="x" size={20} color={'#cc485e'} />
              )}
            </View>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.iconInput}>
              <CustomTextInput
                styles={styles.textInput}
                keyboardType="numeric"
                onChangeText={txt => {
                  setphonenumber(txt);
                  validatePhoneNumber(txt);
                }}
              />
              {isPhoneNumberValid ? (
                <Icon name="check" size={20} color={'#342e9d'} />
              ) : (
                <Icon name="x" size={20} color={'#cc485e'} />
              )}
            </View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.iconInput}>
              <CustomTextInput
                styles={styles.textInput}
                onChangeText={txt => {
                  setemail(txt);
                  validateEmail(txt);
                }}
                placeholder="example@example.com"
              />
              {isEmailValid ? (
                <Icon name="check" size={20} color={'#342e9d'} />
              ) : (
                <Icon name="x" size={20} color={'#cc485e'} />
              )}
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.iconInput}>
              <CustomTextInput
                styles={styles.textInput}
                onChangeText={txt => {
                  setpassword(txt);
                  validatePassword(txt);
                }}
                placeholder="8 kí tự trở lên"
              />
              {isPasswordValid ? (
                <Icon name="check" size={20} color={'#342e9d'} />
              ) : (
                <Icon name="x" size={20} color={'#cc485e'} />
              )}
            </View>
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
