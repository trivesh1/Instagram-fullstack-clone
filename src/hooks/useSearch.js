import { firebase } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import  { useState } from 'react'

const useSearch = () => {
    const [isLoading,setIsLoading]=useState(false);
    const [user,setUser]=useState(null);

    const SearchUser=async (username)=>{
        setIsLoading(true)
        setUser(null)
        try {
            const q=query(collection(firebase,"users"),where("username","==" ,username))
            const querySnapshot=await getDocs(q)
            if(querySnapshot.empty)
                return alert("User not found ");
                 
            
            querySnapshot.forEach((doc)=>{
                 setUser(doc.data())
            })
            
            
        } catch (error) {
            alert("User Not Found")
            setUser(null);
            
        }
        finally{
            setIsLoading(false);
        }

    }
    return {isLoading,SearchUser,user,setUser}
  
}

export default useSearch