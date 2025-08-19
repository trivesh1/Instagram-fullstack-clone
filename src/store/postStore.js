import { create } from "zustand";
 const usePostStore=create((set)=>({
  posts:[],
  createPost:(post)=>set(state=>({posts:[post,...state.posts] })),
  setPosts:(posts)=>set({posts}), 
  deletePost:(id)=>set(state=>({posts:state.posts.filter((post)=>post.id!==id)})),
   addComment:(postId,comment)=>set(state=>({
    posts:state.posts.map(post=>{
        if(post.id===postId){
            return{
                ...post,
                comments:[...post.comments,comment]
            }
        }
        return post;
    })
   }))
  

 }))
 export default usePostStore



 // rules_version = '2';
 
//  service cloud.firestore{
//   match /databses/{database}/documents {
//  // match /users/{userId}{
//  // allow read;
//  // allow write:if request.auth != null && request.auth.uid==userId;
//  // }
 
//  //  match /posts/{postId}{
  
//  //   allow read;
//  //   allow create: if request.auth !=null;
//  //   allow update: if request.auth !=null;
//  //   allow delete: if request.auth !=null && request.auth.uid==resource.data.createdBy;
 
//  match /{document=**}{
//  allow read;
//  allow write;

// }
  
  
//   } 