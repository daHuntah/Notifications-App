import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';

function NotificationTab({navigation}) {
  useEffect(() => {
    // Tạo kết nối WebSocket tới URL cụ thể
    const socket = new WebSocket('ws://18.166.15.69:3000');

    // Xử lý sự kiện khi kết nối mở
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    // Xử lý sự kiện khi nhận tin nhắn từ máy chủ
    socket.onmessage = e => {
      console.log('Received message:', e.data);
    };

    // Xử lý sự kiện khi có lỗi
    socket.onerror = e => {
      console.error('WebSocket error:', e.message);
    };

    // Xử lý sự kiện khi kết nối đóng
    socket.onclose = e => {
      console.log('WebSocket connection closed:', e.code, e.reason);
    };

    // Trả về một hàm để đóng kết nối khi component bị unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.title}>Thông báo</Text>
        <FlatList />
      </View>
    </SafeAreaView>
  );
}

export default NotificationTab;
