import React from 'react'
import Postheader from './Postheader'
import { Box, Image } from '@chakra-ui/react'
import Postfooter from './Postfooter'
import useGetUserProfileById from '@/hooks/useGetUserProfileById'

export const Feedpost = ({post}) => {

  const {isLoading,userProfile}=useGetUserProfileById(post.createBy)
 
  return (
    < >
    {!isLoading&&(<Postheader post={post} CreatedBy={userProfile}/>)}
    
    <Box my={2} borderRadius={4}
    overflow={"hidden"}>
        <Image src={post.imageURL}></Image>
    </Box>
   {!isLoading&&(<Postfooter post={post} CreatedBy={userProfile}/>)}
    </>
  )
}
