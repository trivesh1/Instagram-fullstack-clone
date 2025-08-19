import { auth } from '@/firebase/firebase'
import useAuthStore from '@/store/authStore';


import { useSignOut } from 'react-firebase-hooks/auth'

const useLogout = () => {
    const [signOut,isLogginOut,error]=useSignOut(auth)
    const logout=useAuthStore(state=>state.logout);
    const handleLogout=async ()=>{
        try {
            await signOut();
            localStorage.removeItem("user-info")
            logout();
            
            
        } catch (error) {
            console.log(error)
            
        }

    }
  return  {handleLogout,isLogginOut,error}
 
  
}

export default useLogout