import { useReducer, useEffect, useState } from "react"
import 'firebase/firestore';
import { projectFirestore } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'EDITED_DOCUMENT':
      return { isPending:false, document:null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  const ref = projectFirestore.collection(collection)

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    } 
  }

  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const addedDocument = await ref.add({ ...doc })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  const updateDocument = async (transaction) => {
    dispatch({ type: 'IS_PENDING' })
    
    return ref.doc(transaction.id).update({
      name: transaction.name,
      amount: transaction.amount
    })
    .then(() => {
        console.log("Document successfully updated!");
        dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT' })
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })

    });
     
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }

}