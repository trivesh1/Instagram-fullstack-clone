import { firebase } from "@/firebase/firebase"
import useAuthStore from "@/store/authStore"
import usePostStore from "@/store/postStore"
import useUserProfileStore from "@/store/userProfileStore"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"



const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts} = usePostStore();
    // const [posts,setPosts]=useState([])
	const authUser = useAuthStore((state) => state.user);
	
	const { setUserProfile } = useUserProfileStore();
   

	useEffect(() => {
		const getFeedPosts = async () => {
			setIsLoading(true);
			if (authUser.following.length === 0) {
				setIsLoading(false);
				setPosts([]);
				return;
			}
            
            
			
			try {
                const q =  query(collection(firebase, "posts"), where("createBy", "in", authUser.following));
				const querySnapshot = await getDocs(q);
				const feedPosts = [];

             
				querySnapshot.forEach((doc) => {
					feedPosts.push({ id: doc.id, ...doc.data() });
				});

				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                
				setPosts(feedPosts);
			} catch (error) {
              console.log(error)
                
				
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getFeedPosts();
    
	}, [authUser,  setPosts, setUserProfile]);

	return { isLoading, posts };
};

export default useGetFeedPosts;


// const useGetFeedPost = () => {

//     const [isLoading,setisloading]=useState(true)
//     const {posts,setPosts}=usePostStore()
//     const authUser=useAuthStore((state)=>state.user)
//     const {setUserProfile}=useUserProfileStore()

//     useEffect(()=>{
//         const getFeedPosts=async()=>{
//             setisloading(true)
//             if(authUser.following.length===0){
//                 setisloading(false)
//                 setPosts([])
//                 return
//             }
//              const q=query(collection(firebase,"posts"),where("createdBy","in",authUser.following))
               
//             try {
//                 const querySnapShot=await getDocs(q)
//                 const feedPosts=[]
//                 querySnapShot.forEach(doc=>{
//                     feedPosts.push({id:doc.id,...doc.data()})
//                 })
//                 feedPosts.sort((a,b)=>b.createdAt-a.createdAt)
//                 setPosts(feedPosts)
//                 console.log(feedPosts)
               
                
//             } catch (error) {
//                 alert("there is an error")
                
//             }
//             finally{
//                 setisloading(false)

//             }
//         }
//         if(authUser){
//             getFeedPosts();
//         }
//     },[authUser,setPosts,setUserProfile])
//     return {isLoading,posts}
// }

// export default useGetFeedPost