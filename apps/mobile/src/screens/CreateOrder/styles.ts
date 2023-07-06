import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFF'
  },
  input: {
    minWidth: '90%',
    fontSize: 22,
    fontWeight: '700',
    margin: 8,
    marginTop: 30,
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderColor: '#8A8A8A',
    borderRadius: 5,
    color: '#F0F0F0'
  },
  button: {
    margin: 2,
    width: '90%',
    height: 50,
    backgroundColor: '#3FFFA3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: '600'
  },
  addMoreItemButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: 100,
    left: 50,
    marginHorizontal: 10
  }
})
export default styles
