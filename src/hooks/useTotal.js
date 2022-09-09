import { useState, useEffect } from 'react'
import { projectFirestore } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

export const useTotal = (collection) => {
    const { user } = useAuthContext()
    const [total, setTotal] = useState(0)
    const [error, setError] = useState(null)


    useEffect(() => {
        let ref = projectFirestore.collection(collection).where("uid", "==", user.uid)
    
        const unsubscribe = ref.onSnapshot(snapshot => {
          let sum = 0
          snapshot.docs.forEach(doc => {
            sum = sum + parseInt(doc.data().amount)
          });
          setTotal(sum)
          setError(null)
        }, error => {
          console.log(error)
          setError('could not fetch the data')
        })
    
        return () => unsubscribe()
    
      }, [collection, user])

      return {total, error}
}