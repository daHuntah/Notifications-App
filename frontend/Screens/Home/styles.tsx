import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#7297d4',
  },
  msgContainer: {
    backgroundColor: '#fbfcfd',
    width: '95%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
  },
  header: {
    fontWeight: 'bold',
    color: '#342e9d',
    fontSize: 26,
    marginBottom: 30,
  },
  itemContainer: {
    marginBottom: 25,
  },

  title: {
    color: '#CC485e',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  status: {
    marginBottom: 5,
    color: '#adb5c6',
  },
  content: {
    fontSize: 14,
  },
});

export default styles;
