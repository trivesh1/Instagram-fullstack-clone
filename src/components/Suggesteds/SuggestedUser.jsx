import useFollow from "@/hooks/useFollow";
import useAuthStore from "@/store/authStore";
import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom";



const SuggestedUser = ({user,setUser}) => {
    const { isFollowing, isUpdating, handleFollowing }=useFollow(user.uid);
    const authUser=useAuthStore(state=>state.user)
    const onFollow=async()=>{
        await handleFollowing();
        setUser({
            ...user,
            followers:isFollowing ?user.followers.filter((follower)=>follower.uid !==authUser.uid):
            [user.followers,authUser],
     } )
    }
  return (

   <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
         <Avatar.Root>

      <Avatar.Fallback  />
      <Avatar.Image src={user.profilePicUrl} />
    </Avatar.Root>
    </Link>
   
    <VStack spacing={2} alignItems={"flex-start"}>

         <Link to={`/${user.username}`}>
        <Box fontSize={12} fontWeight={"bold"}>
            {user.fullname}
            
        </Box>
        </Link>
        <Box fontSize={11} fontWeight={"bold"} color={"gray.500"}>
            {user.followers.length} followers
        </Box>
    </VStack>
     </Flex>
    {authUser.uid !==user.uid&&
    <Button fontSize={13}
    loading={isUpdating}
    bg={"transparent"}
    p={2}
    h={"max-content"}
    fontWeight={"medium"}
    color={"blue.400"}
    _hover={{
        color:"white", 
    }}
    onClick={onFollow}>

        {isFollowing?"UnFollow":"Follow"}
    </Button>}

   </Flex>
  )
}

export default SuggestedUser