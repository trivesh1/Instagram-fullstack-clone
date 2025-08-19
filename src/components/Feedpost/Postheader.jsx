import useFollow from '@/hooks/useFollow'
import { timeAgo } from '@/Utils/timeAgo'
import { Avatar, Box, Button, Flex, Text,} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'



const Postheader = ({post, CreatedBy}) => {
  
  const { isFollowing, isUpdating, handleFollowing }=useFollow(post.createBy);
 
  return (
   <>
   <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    <Flex alignItems={"center"} gap={2}>
      <Link to={`/${CreatedBy.username}`}>
      <Avatar.Root my={3}>
        <Avatar.Fallback name='user profile pic'/>
        <Avatar.Image  src={CreatedBy.profilePicUrl}/>
      </Avatar.Root>
      </Link>
      <Flex fontSize={14} fontWeight={"bold"} gap={2}>
       <Link to={`/${CreatedBy.username}`}>
      {CreatedBy.username}
      </Link>
      <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box> 
      </Flex>
    
    </Flex>
    <Box 
    cursor={"pointer"}
   
    >
     <Button
     loading={isUpdating}
     onClick={handleFollowing}
     variant={"ghost"}
     fontSize={12}
     color={"blue.500"}
     fontWeight={"bold"}
     _hover={{
        color:"white",
     }}
     transition={"0.2s ease-in-out"}>
        Unfollow
    </Button>
    </Box>
   </Flex>
   </>
  )
}

export default Postheader