import { firebase } from "@/firebase/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

const useGetUserProfileById = (userId) => {
    const [isLoading,setIsLoading]=useState(true)
    const [userProfile,setUserProfile]=useState(null)

    useEffect(()=>{
        const getUserUserProfile=async()=>{
            setIsLoading(true)
            setUserProfile(null)
            try {
                const userRef=await getDoc(doc(firebase,"users",userId))
                if(userRef.exists()){
                    setUserProfile(userRef.data());
                }
                
            } catch (error) {
                
            }
            finally{
                setIsLoading(false)
            }

        }
        getUserUserProfile()
    },[setUserProfile,userId])
  return {isLoading,userProfile,setUserProfile}
}

export default useGetUserProfileById