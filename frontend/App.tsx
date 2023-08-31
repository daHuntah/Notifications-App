// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';
import NotificationTab from './Screens/Home/NotificationTab';
import NotificationHistoryTab from './Screens/Home/NotificationHistoryTab';
import Login from './Screens/Authen/Login';
import Register from './Screens/Authen/Register';
import ForgetPassInput from './Screens/Authen/ForgetPass/ForgetPassInput';
import ForgetPassOTP from './Screens/Authen/ForgetPass/ForgetPassOTP';
import ProfileTab from './Screens/Home/ProfileTab';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName, iconColor, iconSize;

          if (route.name === 'NotificationTab') {
            iconName = focused ? 'bell' : 'bell';
            iconColor = focused ? '#342e9d' : 'black';
            iconSize = focused ? 30 : 20;
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person';
            iconColor = focused ? '#342e9d' : 'black';
            iconSize = focused ? 30 : 20;
          }
          return <Icon name={iconName} size={iconSize} color={iconColor} />;
        },
      })}>
      <Tab.Screen
        name="NotificationTab"
        component={NotificationTab}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
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
      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
