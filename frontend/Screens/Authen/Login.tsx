import React from 'react';
import {Image, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function Home(): JSX.Element {
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
        <CustomTextInput placeholder="Password" styles={styles.textInput} />
        <Button content='Quên mật khẩu ?' btnstyle={styles.forgotPass} btntextstyle={styles.forgotPasstext}/>
        <Button
          content="ĐĂNG NHẬP"
          btnstyle={styles.btnstyle}
          btntextstyle={styles.btntextstyle}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
