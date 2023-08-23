import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 330,
    height: '100%',
  },
  formContainer: {
    alignSelf: 'center',
    flex: 2,
    width: 370,
    height: '100%',
  },
  textInput: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingLeft: 10,
  },
  btnstyle: {
    backgroundColor: 'blue',
    width: 200,
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
    fontWeight: 'bold',
  },
  forgotPass: {
    alignSelf: 'flex-end',
    margin: 15,
  },
  forgotPasstext: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  RegNav: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  RegNavtext: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
