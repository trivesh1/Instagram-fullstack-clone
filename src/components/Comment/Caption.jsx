import useUserProfileStore from '@/store/userProfileStore'
import { timeAgo } from '@/Utils/timeago'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'

const Caption = ({post}) => {
    const userProfile=useUserProfileStore(state=>state.userProfile)
  return (<>
  
      <Flex gap={4}>
          <Link to={`/${userProfile.username}`}>
          <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image src={userProfile.profilePicUrl} />
          </Avatar.Root>
          </Link>
          <Flex
         direction={"column"}
          >
              <Flex gap={2}>
                  <Link to={`/${userProfile.username}`}>
                  <Text fontWeight={"bold"}>
                      {userProfile.username}
                  </Text>
                  </Link>
                  <Text fontSize={14}>
                      {post.caption}
                  </Text>
              </Flex>
              <Text fontSize={12} color={"gray"}>
                     {timeAgo(post.createdAt)}
                  </Text>
  
  
          </Flex>
  
      </Flex>
  
  
  
  
  
  </>
    
  )
}

export default Caption