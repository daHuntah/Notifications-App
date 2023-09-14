import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import Button from '../../Components/Button';
import styles from './styles';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function RequestNotiPermission({route}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 6,justifyContent: 'center', padding: 20}}>
        <Text
          style={{
            alignSelf: 'center',
            marginBottom: 80,
            fontSize: 28,
            color: '#342e9d',
            fontWeight: 'bold',
          }}>
          YÊU CẦU CẤP QUYỀN
        </Text>
        <Text style={{fontSize: 15}}>
          Ứng dụng yêu cầu cho phép quyền gửi thông báo để có thể hoạt động, bạn
          hãy làm theo các bước sau:
        </Text>
        <View style={{padding: 10, marginTop: 5}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Cài đặt  ->  Ứng dụng  ->  Tìm [EASM]E -> Cho phép ứng dụng gửi thông báo</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 13, color: '#adb5c6', alignSelf: 'center', marginBottom: 10}}>Bạn đã cấp phép ? nhấn vào bên dưới</Text>
        <Button btnstyle={styles.btncheckper} btntextstyle={styles.btncheckpertxt} content='ĐÃ CHO PHÉP' onPress={() => route.params.requestUserPermission()}/>
      </View>
    </View>
  );
}
