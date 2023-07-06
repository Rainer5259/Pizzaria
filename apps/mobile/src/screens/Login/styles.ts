import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: '0%',
    backgroundColor: '#1D1D2E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    marginTop: 100,
    width: '100%'
  },
  input: {
    marginHorizontal: '10%',
    margin: 8,
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'left',
    borderColor: '#8A8A8A',
    borderRadius: 5,
    color: '#F0F0F0'
  },
  button: {
    marginHorizontal: '10%',
    height: 50,
    backgroundColor: '#3FFFA3',
    borderRadius: 5,
    justifyContent: 'center'
  },
  text: { color: '#1D1D2E', textAlign: 'center', fontWeight: '600' }
})
export default styles
