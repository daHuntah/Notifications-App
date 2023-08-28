import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7091F5',
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 270,
    height: '100%',
  },
  card: {
    backgroundColor: 'white',
    width: '96%',
    height: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 5,
  },
  card2: {
    backgroundColor: 'white',
    width: '96%',
    height: 550,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 5,
  },
  label: {
    marginLeft: 15,
  },
  formContainer: {
    alignSelf: 'center',
    flex: 2,
    width: 370,
    height: '100%',
  },
  formContainerReg: {
    alignSelf: 'center',
    flex: 3,
    width: 370,
    height: '100%',
  },
  textInput: {
    margin: 15,
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingLeft: 10,
  },
  btnstyle: {
    backgroundColor: '#793FDF',
    width: 280,
    height: 50,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntextstyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  forgotPass: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  forgotPasstext: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  RegNav: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  RegNavtext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  alert: {
    color: 'red',
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ trong suốt là 0.5
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
