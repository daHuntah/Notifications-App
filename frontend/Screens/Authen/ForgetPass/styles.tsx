import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: '#C5DFF8',
    width: '90%',
    height: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 5,
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5,
  },
  textContainer2: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textIP: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#4A55A2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: 100,
    height: 50,
    margin: 5,
  },
  btn2: {
    backgroundColor: '#4A55A2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: 130,
    height: 50,
    marginTop: 30,
  },
  btnText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
});

export default styles;
