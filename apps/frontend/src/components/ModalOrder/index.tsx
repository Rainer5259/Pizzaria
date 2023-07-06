import Modal from 'react-modal'
import styles from './modal.module.scss'
import { FiX } from 'react-icons/fi'
import { OrderItemProps } from '@//pages/dashboard'
import { useEffect } from 'react'

interface ModalOrderProps {
  isOpen: boolean
  onRequestClose: () => void
  order: OrderItemProps[]
  handleFinishOrder: (id: string) => void
  handleRemoveOrder: (id: string) => void
}
export function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
  handleRemoveOrder
}: ModalOrderProps) {
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      backgroundColor: '#1D1D2E',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color="#F34741" />
      </button>
      {order[0] === undefined ? (
        <>
          <section className={styles.containerItem}>
            <span className={styles.description}>
              <strong>Não tem nenhum item neste pedido</strong>
            </span>
          </section>
          <button
            className={styles.buttonOrder}
            onClick={() => handleRemoveOrder(order[0].order_id)}
          >
            Remover pedido da lista
          </button>
        </>
      ) : (
        <div className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>
            Mesa: <strong>{order[0].order.table}</strong>
          </span>
          {order?.map(item => (
            <section key={item.id} className={styles.containerItem}>
              <span>
                {item.amount} - <strong>{item.product.name}</strong>
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}
          <button
            className={styles.buttonOrder}
            onClick={() => handleFinishOrder(order[0].order_id)}
          >
            Concluir Pedido
          </button>
        </div>
      )}
    </Modal>
  )
}
