import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res || !displayName) {
              throw new Error('Could not complete signup')
             }

            // add display name to user
            await res.user.updateProfile({ displayName })

            dispatch({ type: 'LOGIN', payload: res.user })

            setIsPending(false)
            setError(null)
           }
           catch (err) {
            console.log(err)
            setError(err)
            setIsPending(false)
           }

    }

    return {signup, error, isPending}
}