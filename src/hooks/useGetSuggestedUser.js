import { firebase } from "@/firebase/firebase"
import useAuthStore from "@/store/authStore"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"


const useGetSuggestedUser = () => {
    const [isLoading,setIsLoading]=useState(true)
    const [suggestedUser,setSuggestedUser]=useState([])
    const authUser=useAuthStore(state=>state.user);


    useEffect(()=>{
        const getSuggestedUsers=async()=>{
            try {
                const userRef=(collection(firebase,"users"))
                const q=query(userRef,
                    where("uid","not-in",[authUser.uid,...authUser.following]), 
                    orderBy('uid'),
                    limit(4)
                )
                const querySnapshot=await getDocs(q)
                const users= [];
                querySnapshot.forEach(doc=>{
                    users.push({...doc.data(),id:doc.id} )
                }
                )
                setSuggestedUser(users )
            } catch (error) {
                console.log(error);
                
            }
            finally{
                setIsLoading(false)
            }
        }
        if(authUser ) getSuggestedUsers()
    },[authUser])
return {isLoading,suggestedUser}
  
}

export default useGetSuggestedUser