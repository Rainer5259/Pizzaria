import { StyleSheet } from 'react-native'
import { fontStyles } from '../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#334',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    height: 520,
    width: 300,
    paddingHorizontal: 10,
    borderRadius: 15
  },
  primaryText: {
    top: 20,
    padding: 6,
    ...fontStyles.body,
    alignSelf: 'flex-start'
  },
  banner: { width: '100%', aspectRatio: 1 }
})
export default styles
