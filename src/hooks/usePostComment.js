import { firebase } from "@/firebase/firebase";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react"


const usePostComment = () => {
    const [isloading,setIsLoading]=useState(false);
    const authUser=useAuthStore(state=>state.user);
    const addComment=usePostStore(state=>state.addComment)



    const handlePostComment=async(postId,comment)=>{
        if(isloading)return
        if(!authUser)return alert("you must be logged-in")
        setIsLoading(true)
        const newComment={
                comment:comment,
                createdAt:Date.now(),
                createdBy:authUser.uid,
                postId:postId,
            }
        try {
            await updateDoc(doc(firebase,"posts",postId),{
                comments:arrayUnion(newComment)
            })
            addComment(postId,newComment)
          
            
        } catch (error) {
           alert("there is an error")
        }
        finally{
            setIsLoading(false)
        }


    }
    return {isloading,handlePostComment}
  
}

export default usePostComment