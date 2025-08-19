import { firebase } from '@/firebase/firebase';
import useAuthStore from '@/store/authStore';
import useUserProfileStore from '@/store/userProfileStore';

import { doc, updateDoc } from 'firebase/firestore';
import  { useState } from 'react'


const useEditprofile = () => {
  const [isUpdating ,setISUpdating]=useState(false);
  const authUser=useAuthStore(state=>state.user)
  const setauthUser=useAuthStore(state=>state.setUser)
  const userDocRef=doc(firebase,"users",authUser.uid)
  const setuserprofile=useUserProfileStore((state)=>state.setUserProfile)
  
  
  
  const editUSerProfile=async (inputs,selectedFile)=>{
   if (isUpdating||!authUser) return
    setISUpdating(true) 
    let URL=""

    try {
        if(selectedFile){
            // await uploadString(storageRef,selectedFile,"data_url")
            // URL=await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))
            
            URL=selectedFile;


        }
        const updatedUser={
            ...authUser,
            fullname:inputs.fullname||authUser.fullname,
            username:inputs.username||authUser.username,
            bio:inputs.bio || authUser.bio ,
            profilePicUrl:URL||authUser.profilePicUrl,       }
          await updateDoc(userDocRef,updatedUser)
          localStorage.setItem("user-info",JSON.stringify(updatedUser))
          setauthUser(updatedUser)
          setuserprofile(updatedUser)
          alert("Profile Updated Succesfully")
           setISUpdating(false) 
        
    } catch (error) {
       alert("there is an error");
         setISUpdating(false) 
    }

  }
  return {editUSerProfile,isUpdating}
}


export default useEditprofile