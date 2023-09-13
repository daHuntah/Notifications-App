import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

async function requestUserPermission() {
  const navigation = useNavigation();
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Authorization status: granted');
      await getFCMtoken();
    } else {
      console.log('Authorization status: denied');
      navigation.navigate('RequestNotiPermission');
    }
  } catch (err) {
    console.error('Error requesting permission:', err);
  }
}

async function getFCMtoken() {
  try {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log(fcmtoken);

    if (!fcmtoken) {
      fcmtoken = await messaging().getToken();

      urlsendfcm = '';
      try {
        await fetch(fcmtoken, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(fcmtoken),
        });
      } catch (error) {
        console.log(error);
      }

      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(remoteMessage => {
    console.log(
      'notification on foreground state.....',
      remoteMessage.notification,
    );
  });
};

export {requestUserPermission, NotificationListener};
