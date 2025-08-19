import { auth, firebase } from '@/firebase/firebase'
import useAuthStore from '@/store/authStore';
import { doc, getDoc } from 'firebase/firestore';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

const useSignIn = () => {
     const loginUser = useAuthStore(state => state.login)
    const [signInWithEmailAndPassword,user,loading,error]=useSignInWithEmailAndPassword(auth);
    
    const login =async (inputs)=>{
        if(!inputs.email ||!inputs.password){
            alert("Plz Fill All inputs")
            return
        }
        try {
            const userCred=await signInWithEmailAndPassword(inputs.email,inputs.password);
            
            if(userCred){
                const docRef=doc(firebase,"users",userCred.user.uid);
                const docSnap=await getDoc(docRef);
                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
               loginUser(docSnap.data());
            }
        } catch (error) {
            alert("dfklm")
            
        }
    }
    return {loading,error,login}

}

export default useSignIn