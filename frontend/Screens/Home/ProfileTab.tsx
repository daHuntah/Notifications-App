import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/Octicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileTab = ({route}) => {
  const doLogout = () => {
    AsyncStorage.removeItem('token');
    route.params.checkToken();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 15, color: '#adb5c6', marginTop: 10}}>
          Xin chào
        </Text>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#342e9d'}}>
          Người dùng
        </Text>
      </View>
      <TouchableOpacity
        style={{alignItems: 'center', marginTop: 40, flexDirection: 'row'}}>
        <Icon
          name="lock"
          size={27}
          style={{marginLeft: 15, color: '#0f0856'}}
        />
        <Text style={{marginLeft: 15, fontSize: 15, fontWeight: '600'}}>
          Đổi mật khẩu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{alignItems: 'center', marginTop: 40, flexDirection: 'row'}}
        onPress={doLogout}>
        <Icon
          name="sign-out"
          size={27}
          style={{marginLeft: 15, color: '#0f0856'}}
        />
        <Text style={{marginLeft: 15, fontSize: 15, fontWeight: '600'}}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTab;
