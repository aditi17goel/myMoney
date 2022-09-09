import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpdationModal(props) {
 
  const { updateDocument } = useFirestore('transactions')
  const { transaction } = props
  const [updatedTransaction, setUpdatedTransaction] = useState('')

  useEffect(()=>{
    setUpdatedTransaction(transaction);
  },[transaction])

  const handleSubmit = (e) => {
    updateDocument(updatedTransaction)
  }
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setUpdatedTransaction({...updatedTransaction, name: e.target.value})} 
            defaultValue={transaction.name} 
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            defaultValue={transaction.amount} 
            onChange={(e) => setUpdatedTransaction({...updatedTransaction, amount: e.target.value})} 
          />
        </label>
      </form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={()=> {props.onHide();handleSubmit()}}>Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }