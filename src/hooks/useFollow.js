import { firebase } from "@/firebase/firebase";
import useAuthStore from "@/store/authStore";
import useUserProfileStore from "@/store/userProfileStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { useEffect, useState } from "react"

const useFollow = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user)
  const setAuthUser = useAuthStore((state) => state.setUser)
  const { userProfile, setUserProfile } = useUserProfileStore();


  const handleFollowing = async () => {
    setIsUpdating(true);
    try {
      const currentUSerRef = doc(firebase, "users", authUser.uid)
      const userToFollow = doc(firebase, "users", userId)



      await updateDoc(currentUSerRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      })
      await updateDoc(userToFollow, {
        followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)

      })
        if (isFollowing) {
				// unfollow
				if(authUser)
				setAuthUser({
					...authUser,
					following: authUser.following.filter((uid) => uid !== userId),
				});
				if (userProfile)
					setUserProfile({
						...userProfile,
						followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
					});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: authUser.following.filter((uid) => uid !== userId),
					})
				);
				setIsFollowing(false);
      }
      else {// follow
		    if(authUser)
				setAuthUser({
					...authUser,
					following: [...authUser.following, userId],
				});

				if (userProfile)
					setUserProfile({
						...userProfile,
						followers: [...userProfile.followers, authUser.uid],
					});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: [...authUser.following, userId],
					})
				);
				setIsFollowing(true);
			}

    } catch (error) {
      alert("there is an error")

    }
    finally {
      setIsUpdating(false);
    }


  }


  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isFollowing, isUpdating, handleFollowing }
}

export default useFollow