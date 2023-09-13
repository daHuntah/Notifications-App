import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';
import {io} from 'socket.io-client'; // Import thư viện socket.io-client
import Icon from 'react-native-vector-icons/Octicons';
function NotificationTab({navigation}) {
  const [response, setResponse] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getList = async () => {
    let urlGetList = 'http://18.166.15.69:3000/notifications';

    const response1 = await fetch(urlGetList, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response1),
    });

    const responseData = await response1.json();
    const reversedData = responseData.slice().reverse();

    setResponse(reversedData);
  };

  const onRefresh = () => {
    setRefreshing(true);
    try {
      getList().then(() => {
        setRefreshing(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const socket = io('ws://18.166.15.69:3000');

    socket.on('connect', () => {
      console.log('Connect');
    });

    // Xử lý sự kiện khi nhận tin nhắn từ máy chủ
    socket.on('onNotification', newData => {
      setResponse(prevResponse => [newData, ...prevResponse]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const render = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.status}>{item.status}</Text>
        <Text style={styles.content}>" {item.content} "</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', padding: 20, alignItems: 'center'}}>
        <Text style={styles.header}>Thông báo</Text>
        <Icon
          name="feed-person"
          size={40}
          style={{flex: 1}}
          color="#342e9d"
          onPress={() => navigation.navigate('ProfileTab')}
        />
      </View>
      <FlatList
        data={response}
        keyExtractor={(item, index) => index.toString()}
        renderItem={render}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

export default NotificationTab;
