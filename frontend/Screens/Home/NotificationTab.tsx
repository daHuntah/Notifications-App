import React from 'react';
import {View} from 'react-native';
import Button from '../../Components/Button';

function NotificationTab({navigation}) {
  return (
    <View>
      <Button
        content="Nav"
        onPress={() => navigation.navigate('NotificationHistoryTab')}
      />
    </View>
  );
}

export default NotificationTab;
