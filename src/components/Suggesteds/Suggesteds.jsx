import {  Flex, Link, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import useGetSuggestedUser from "@/hooks/useGetSuggestedUser"


const Suggesteds = () => {
  const {isLoading,suggestedUser}=useGetSuggestedUser();
  if(isLoading)return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader/>
      
      {suggestedUser.length !==0 &&
       <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
         <Text fontSize={14} fontWeight={"bold"} color={"gray.500"}>
           Suggested for you
         </Text>
         <Text cursor={"pointer"} _hover={{
         color:"gray.400",
         }} fontSize={12} fontWeight={"bold"}>
          See All
        </Text>
          </Flex>
      }
      
      {
        suggestedUser.map(user=>(
          <SuggestedUser user={user} key={user.id}/>
       ) )
      }




      <Text>
     
        ©2025 Built By <b>Trivesh </b>
        <Link href="https://www.instagram.com/mahakal_dubey/" color={"blue.400"} fontSize={14}> asaprogrammer_</Link>

      </Text>
     

    </VStack>
    
  )
}

export default Suggesteds