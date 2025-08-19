import { Button, CloseButton, Container, HStack, Skeleton, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Feedpost } from './Feedpost'
import useGetFeedPost from '@/hooks/useGetFeedPost'
import { Link } from 'react-router-dom'

import useGetSuggestedUser from '@/hooks/useGetSuggestedUser'
import SuggestedUser from '../Suggesteds/SuggestedUser'
import Suggesteds from '../Suggesteds/Suggesteds'

const Feedposts = () => {
  const [suggested,setSuggested]=useState(false);
  const {posts,isLoading}=useGetFeedPost()
  const handleSuggested=()=>{
    setSuggested(true);

  }


 
  return (
    
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading && [0,1,2,3].map((_,idx)=>(
        <Stack 
        key={idx}
        gap="4"
        alignItems={"flex-start"} maxW="xs"
        mb={10}>
      <HStack width={"full"}>
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton  width={"full"}
      height={400} />
    </Stack>

      ))}
      
      {!isLoading && posts.length>0&&posts.map((post)=><Feedpost key={post.id} post={post}/>)}
      {!isLoading && posts.length==0 &&(
        <>
        <Text fontSize={"md"} color={"red.400"}>
         It&apos;s Looks Like you don&apos;t follow Some One
        </Text>
       
         <Text fontSize={"md"} cursor={"pointer"}color={"blue.400"}>
         Follow User&apos;s To See Posts
        </Text>
        <Button variant={'ghost'} onClick={handleSuggested} color={"blue.400"} display={{base:"block",md:"none"}}>See Users</Button>
        {suggested&&<Suggesteds/>}
        </>


      )}
      

    </Container>
  )
}

export default Feedposts