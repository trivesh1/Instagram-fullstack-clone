import useProfilebyusername from "@/hooks/useProfilebyusername"
import useAuthStore from "@/store/authStore"
import { Avatar, AvatarGroup, Box, Button, Flex, Text, VStack } from "@chakra-ui/react"


import EditProfileBut from "./EditProfileBut"
import useFollow from "@/hooks/useFollow"
const ProfileHeader = () => {
    const {userProfile}=useProfilebyusername()
    const authUser=useAuthStore(state=>state.user);
    
    const {isFollowing,isUpdating,handleFollowing}=useFollow(userProfile?.uid)
    const visitingOwnProfileAndAuth=authUser && authUser.username===userProfile.username;
    const visitingAnathoreUSerProfileAndAuth=authUser&&authUser.username!=userProfile.username;
    
  
    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                justifySelf={"center"}
                alignSelf={"center"}
                mx={"auto"}>
                <Avatar.Root >
                    <Avatar.Fallback />
                    <Avatar.Image src={userProfile.profilePicUrl} />
                </Avatar.Root>
{/* <EditProfileBut/>  */}

            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4}direction={{base:"column",sm:"row"}}
                justifyContent={{base:"center",sm:"flex-start"}}
                alignItems={"center"}
                w={"full"}>
                    <Text fontSize={{base:"sm",md:"lg"}}>
                        {userProfile.username}
                    </Text>
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                       {visitingOwnProfileAndAuth&&(
                        <Box flex={1} w={{ base: "calc(100%-100px)", md: "calc(100%-240px)" }} mx={"auto"}p={"auto"}>
                                           <EditProfileBut/> 
                                       </Box>  )}
                       {visitingAnathoreUSerProfileAndAuth&&(
                         <Button bg={"blue.400"} color={"white"}_hover={{
                            bg:"blue.300"
                        }}
                        loading={isUpdating}
                       onClick={handleFollowing}
                        size={{base:"xs",md:"sm"}}
                      >
                           {isFollowing ?"UnFollow":"Follow"}

                        </Button>
                       )}
                    </Flex>

                </Flex>
           <Flex alignItems={"center"} gap={{base:2,sm:4}}>
            <Text fontSize={{base:"xs",md:"sm"}}>
                <Text as ="span" fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
                Posts
            </Text>
             <Text fontSize={{base:"xs",md:"sm"}}>
                <Text as ="span" fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                Followers
            </Text>
            <Text fontSize={{base:"xs",md:"sm"}}>
                <Text as ="span" fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
               
                Following
            </Text>
            

           </Flex>
           <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.fullname}</Text>


           </Flex>
           <Text fontSize={"sm"}>{userProfile.bio}</Text>
            </VStack>

        </Flex>
    )
}

export default ProfileHeader



//  <Button bg={"white"} color={"black"}_hover={{
//                             bg:"whiteAlpha.800"
                            
//                         }}
//                         size={{base:"xs",md:"sm"}}>
//                             Edit Profile

//                         </Button>