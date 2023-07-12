import React from 'react'
import ButtonIoniconsCustomizable from '../ButtonIoniconsCustomizable'
import styles from './styles'
import { Image, Text, View } from 'react-native'
import { Product } from '../../../types/index'
import { Modal } from 'react-native'

type ModalProps = {
  item: Product | null
  visible: boolean
  closeModal: (state: boolean) => void
}
const ModalOrderDetails: React.FC<ModalProps> = ({
  item,
  visible,
  closeModal
}) => {
  return (
    <Modal transparent={true} visible={visible}>
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
          source={{ uri: item?.banner }}
          style={styles.banner}
          resizeMode="contain"
        />
        <Text style={styles.primaryText}>{item?.name}</Text>
        <Text style={styles.primaryText}>R$ - {item?.price}</Text>
        <Text style={styles.primaryText}>{item?.description}</Text>
      </View>
    </Modal>
  )
}

export default ModalOrderDetails
