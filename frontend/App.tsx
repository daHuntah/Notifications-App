/* eslint-disable react/no-unstable-nested-components */
// App.js
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationTab from './Screens/Home/NotificationTab';
import Login from './Screens/Authen/Login';
import Register from './Screens/Authen/Register';
import ForgetPassInput from './Screens/Authen/ForgetPass/ForgetPassInput';
import ForgetPassOTP from './Screens/Authen/ForgetPass/ForgetPassOTP';
import ProfileTab from './Screens/Home/ProfileTab';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestNotiPermission from './Screens/Authen/RequestNotiPermission';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const Stack = createStackNavigator();

const App = () => {
  const [nav, setnav] = useState(false);
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);

  async function requestUserPermission() {
    try {
      await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
        console.log(result);

        if (result === 'granted') {
          setShowPermissionRequest(false);
          getFCMtoken();
        } else {
          setShowPermissionRequest(true);
        }
      });
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
      } else {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkToken = async () => {
    var currentToken = await AsyncStorage.getItem('token');

    if (currentToken !== null) {
      let urlcheck = 'http://18.166.15.69:3000/auth/token';
      try {
        const respone = await fetch(urlcheck, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({token: currentToken}),
        });

        var responseData = await respone.json();

        if (responseData.status === 1) {
          setnav(true);
          console.log('thanh cong');
        } else {
          setnav(false);
          console.log('that bai');
        }
      } catch (error) {
        console.log('Lỗi khi chạy hàm: ', error);
        setnav(false);
      }
    } else {
      setnav(false);
      console.log('khong co token');
    }
  };
  const HomeNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NotificationTab"
          component={NotificationTab}
          options={{
            headerShown: false,
            tabBarLabel: () => null,
          }}
        />
        <Stack.Screen
          name="ProfileTab"
          component={ProfileTab}
          options={{
            headerShown: false,
            tabBarLabel: () => null,
          }}
          initialParams={{checkToken: checkToken}}
        />
      </Stack.Navigator>
    );
  };

  const AuthNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
          initialParams={{setnav: setnav}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassInput"
          component={ForgetPassInput}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassOTP"
          component={ForgetPassOTP}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  useEffect(() => {
    // Kiểm tra token
    checkToken();
  }, [nav]);

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <NavigationContainer>
      {showPermissionRequest ? (
        <Stack.Navigator>
          <Stack.Screen
            name="RequestNotiPermission"
            component={RequestNotiPermission}
            options={{headerShown: false}}
            initialParams={{requestUserPermission: requestUserPermission}}
          />
        </Stack.Navigator>
      ) : nav ? (
        <HomeNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
