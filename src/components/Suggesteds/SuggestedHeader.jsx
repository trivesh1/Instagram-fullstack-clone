import useLogout from "@/hooks/useLogout"
import useAuthStore from "@/store/authStore";
import { Button, Flex,  Text } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Link } from "react-router-dom";




const SuggestedHeader = () => {
    const {handleLogout,isLoggingOut}=useLogout();
    const authUser=useAuthStore(state=>state.user)
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link
                to={`${authUser.username}`}>
                <Avatar.Root size={"lg"}>
                    <Avatar.Fallback  />
                    <Avatar.Image src={authUser.profilePicUrl} />
                    
                </Avatar.Root>
                </Link>
                 <Link
                to={`${authUser.username}`}>
                <Text fontSize={12} fontWeight={"bold"}>
                    {authUser.username}
                </Text>
                </Link>
                

            </Flex>
          
            <Button
             onClick={handleLogout}
            variant={"ghost"}
            fontSize={14}
            fontWeight={"medium"}
            color={"blue.400"}
            cursor={"pointer"}
            isLoading={isLoggingOut}
           
            
            > LogOut
            </Button>

        </Flex>
    )
}

export default SuggestedHeader