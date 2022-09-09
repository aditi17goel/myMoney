import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const { user } = useAuthContext()


  useEffect(() => {
    let ref = projectFirestore.collection(collection).where("uid", "==", user.uid)

    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    return () => unsubscribe()

  }, [collection, user])

  return { documents, error }
}