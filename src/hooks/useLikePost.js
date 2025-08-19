import { firebase } from "@/firebase/firebase"
import useAuthStore from "@/store/authStore"
import { arrayRemove, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"


const useLikePost = (post) => {
    const [isLoading,setIsLoading]=useState(false)
    const authUser=useAuthStore(state=>state.user)
    const [likes,setLikes]=useState(post.likes.length)
    const [isLiked,setIsLiked]=useState(post.likes.includes(authUser?.uid))

    const handleLike=async()=>{
       if(isLoading) return
       if(!authUser) return alert("you must be logged in to like a post");
       setIsLiked(true);
       try {
        const postRef=doc(firebase,"posts",post.id)
        await updateDoc(
            postRef,
            {
                 likes:isLiked ? arrayRemove(authUser.uid):arrayUnion(authUser.uid)
            }
           
        )
         setIsLiked(!isLiked)
         isLiked ? setLikes(likes-1):setLikes(likes+1)
        
       } catch (error) {
        alert("there is an error")
        
       }
       finally{
        setIsLoading(false)
       }

    }
  return  {isLoading,isLiked,handleLike,likes}
}

export default useLikePost