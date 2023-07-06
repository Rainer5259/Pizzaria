import React from 'react'
import ButtonIoniconsCustomizable from '../ButtonIoniconsCustomizable'
import styles from './styles'
import { Image, Text, View } from 'react-native'
import { Product } from '../../../types/index'
import { Modal } from 'react-native'

type ModalProps = {
  item: Product
  closeModal: (state: boolean) => void
}
const ModalOrderDetails: React.FC<ModalProps> = ({ item, closeModal }) => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <ButtonIoniconsCustomizable
          useIcon={true}
          name="close-outline"
          size={36}
          color="white"
          style={{ alignSelf: 'flex-end', bottom: 30 }}
          onPress={() => closeModal(false)}
        />
        <Image
          source={{ uri: item.banner }}
          style={{ width: 100, height: 200 }}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <Text style={styles.primaryText}>{item.name}</Text>
        <Text style={styles.primaryText}>R$ - {item.price}</Text>
        <Text style={styles.primaryText}>{item.description}</Text>
      </View>
    </Modal>
  )
}

export default ModalOrderDetails
