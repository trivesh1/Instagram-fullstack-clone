import { firebase } from '@/firebase/firebase';
import useUserProfileStore from '@/store/userProfileStore';
import { collection,  getDocs, query, where } from 'firebase/firestore';
import  { useEffect, useState } from 'react'

const useProfilebyusername = (username) => {
  const [isLoading,setIsLoading]=useState(true);
  const {userProfile,setUserProfile}= useUserProfileStore()
  useEffect(()=>{
    const getUserProfile=async ()=>{
        setIsLoading(true);
        try {
            const q=query(collection(firebase,"users"),where("username","==",username))
            const querySnapShot=await getDocs(q);
            if(querySnapShot.empty)return setUserProfile(null); 
            let userDoc;
            querySnapShot.forEach((doc)=>{
                userDoc=doc.data();
            })
            setUserProfile(userDoc);
           
           

            
        } catch (error) {
           
           
            
        }
        finally{
            setIsLoading(false);

        }

    }
  getUserProfile();
  },[])
  return {isLoading,userProfile}
}

export default useProfilebyusername