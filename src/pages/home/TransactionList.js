import { useState } from "react"
import { useTotal } from '../../hooks/useTotal'
import pencil from './pencil.png'
import styles from './Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import UpdationModal from './Modal.js'

export default function TransactionList({ transactions }) {
  const { total, error } = useTotal('transactions')
  const [ modalShow, setModalShow] = useState(false)
  const [ transaction, setTransaction] = useState('')

  return (
    <>
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <img src = {pencil} alt="edit" className={styles.edit} onClick={() => {
            setModalShow(true)
            setTransaction(transaction) }}/>
        </li>
      ))}
      {!error && <p className={styles.name} >Total: ${total}</p>}
      {error && <p>{error.message}</p>}
    </ul>
    <UpdationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        transaction = {transaction}
      /> 
    </>
  )
}