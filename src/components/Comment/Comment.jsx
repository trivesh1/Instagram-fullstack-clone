import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Avatar } from "@chakra-ui/react"
import useGetUserProfileById from '@/hooks/useGetUserProfileById'
import { Link } from 'react-router-dom'
import { timeAgo } from '@/Utils/timeAgo'


const Comment = ({ comment }) => {
    const {isLoading,userProfile}=useGetUserProfileById(comment.createdBy)
    
    if(isLoading)return
    
    return(
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
                    {comment.comment}
                </Text>
            </Flex>
            <Text fontSize={12} color={"gray"}>
                   {timeAgo(comment.createdAt)}
                </Text>


        </Flex>

    </Flex>
    )
}

export default Comment