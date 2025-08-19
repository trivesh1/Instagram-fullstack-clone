import { NotificationsLogo } from "@/assets/contant"
import { Box, Flex, Tooltip } from "@chakra-ui/react"


const Notifications = () => {
  return (
   
 
        <Flex
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400"}}
        borderRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"10",md:"flex-start"}}
        >
            <NotificationsLogo/>
            <Box display={{base:"none",md:"block"}}>
                Notifications

            </Box>

        </Flex>
    
    
    

   
  )
}

export default Notifications