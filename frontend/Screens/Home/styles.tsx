import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  header: {
    fontWeight: 'bold',
    color: '#342e9d',
    fontSize: 35,
    flex: 7,
  },
  item: {
    width: '92%',
    padding: 10,
    margin: '2%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 20},
    shadowRadius: 10,
    elevation: 5,
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
  avt: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  headerContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  line: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#342e9d',
  },
  funcBtn: {
    backgroundColor: 'white',
  },
  funcBtnText: {},
});

export default styles;
