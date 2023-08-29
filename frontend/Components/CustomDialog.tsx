import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomDialog = ({visible, onClose, alerts}) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.dialog}>
          <Text style={styles.message}>{alerts}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: 350,
    height: 190,
    backgroundColor: '#Fbfcfd',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    padding: 10,
    backgroundColor: '#342e9d',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default CustomDialog;
