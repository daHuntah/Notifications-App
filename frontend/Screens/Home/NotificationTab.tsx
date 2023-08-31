import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {io} from 'socket.io-client'; // Import thư viện socket.io-client
import Icon from 'react-native-vector-icons/Octicons';

function NotificationTab({navigation}) {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    // Tạo kết nối WebSocket tới URL cụ thể
    const socket = io(
      'wss://da26-2001-ee0-41c1-4f53-a1a0-3e9a-9c72-5d80.ngrok-free.app',
    );

    socket.on('connect', () => {
      console.log('Connect');
    });

    // Xử lý sự kiện khi nhận tin nhắn từ máy chủ
    socket.on('onMessage', newData => {
      setResponse(prevResponse => [...prevResponse, newData]);
      console.log(newData);
    });

    // Trả về một hàm để đóng kết nối khi component bị unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const render = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="dot"
            size={20}
            style={{marginTop: 9, marginRight: 10}}
            color={'#8b9dc8'}
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.content}>" {item.content} "</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.header}>Thông báo</Text>
        <FlatList
          data={response}
          keyExtractor={(item, index) => index.toString()}
          renderItem={render}
        />
      </View>
    </SafeAreaView>
  );
}

export default NotificationTab;
