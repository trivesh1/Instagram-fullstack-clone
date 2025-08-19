import { auth, firebase } from '@/firebase/firebase';
import useAuthStore from '@/store/authStore';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const useSignupwithEmail = () => {


  const loginUser = useAuthStore(state => state.login)
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const signup = async (inputs) => {
    if (!inputs.fullname || !inputs.username || !inputs.email || !inputs.password) {
      alert("Plz enter all input");
      return
    }
    const userRef = collection(firebase, "users");
    const q = query(userRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      
      return alert("Username Already Exists Plz enter anather");
    }
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
      if (!newUser && error) {
       
      

        return   console.log(error);
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullname: inputs.fullname,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        }
        await setDoc(doc(firebase, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }

    } catch (error) {
      console.log(error)

    }
  }


  return { loading, error, signup }
}

export default useSignupwithEmail