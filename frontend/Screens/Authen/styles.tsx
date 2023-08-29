import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 10000,
    backgroundColor: '#7297d4',
  },
  logo: {
    width: 300,
    height: 150,
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 90,
  },
  logo2: {
    width: 300,
    height: 150,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  formContainer: {
    height: 1000,
    backgroundColor: '#fbfcfd',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    padding: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#342e9d',
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputContainer2: {
    marginTop: 30,
  },
  label: {
    color: '#adb5c6',
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#342e9d',
  },
  btnLogin: {
    width: 300,
    height: 50,
    backgroundColor: '#342e9d',
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#7297d4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  btnLogintext: {
    fontSize: 18,
    color: '#fbfcfd',
  },
});

export default styles;
