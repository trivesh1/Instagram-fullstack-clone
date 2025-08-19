import { firebase } from '@/firebase/firebase';
import usePostStore from '@/store/postStore'
import useUserProfileStore from '@/store/userProfileStore';
import { collection,  getDocs, query, where } from 'firebase/firestore';
import  { useEffect, useState } from 'react'

const getUserPosts = () => {
  const [isloading ,setIsLoading]=useState(true)
  const {posts,setPosts}=usePostStore();
  const userPorfile=useUserProfileStore(state=>state.userProfile)
 


  useEffect(()=>{
    const getPost=async()=>{
       if (!userPorfile) return
       setIsLoading(true)
       setPosts([])
       try {
        const q=query(collection(firebase,"posts"),where("createBy","==",userPorfile.uid))
       const querySnapShot=await getDocs(q)


       const posts=[]
       querySnapShot.forEach(doc=>{
        posts.push({...doc.data(),id:doc.id})
       })
       posts.sort((a,b)=>b.createdAt-a.createdAt)
       setPosts(posts)
        
       } catch (error) {
        alert(error)
        setPosts([])
        
       }
       finally{
        setIsLoading(false)
       }
    }
    getPost()
  },[setPosts,userPorfile])
  return {isloading,posts}
}

export default getUserPosts