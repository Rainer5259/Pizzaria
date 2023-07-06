import { StyleSheet } from 'react-native'
import { colors, fontStyles } from '../../components/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: colors.background
  },
  title: {
    ...fontStyles.title,
    top: 30
  },
  selectAmountContainer: {
    marginTop: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  amountButton: {
    width: 40,
    height: 40
  },
  addItemButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 50,
    height: 40
  },
  pickerContainer: {
    flexDirection: 'row'
  },
  picker: {
    width: 150,
    height: 50,
    color: 'white'
  },
  pickerItem: {
    color: 'white'
  },
  itemAddedContaier: {
    marginTop: 15,
    width: 310,
    height: 40,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: '#101026'
  },
  sendButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    bottom: 50
  }
})
export default styles
