
import AuthForm from '@/components/AuthForm/AuthForm'
import { Flex, Container, Image, Box, VStack } from '@chakra-ui/react'
import React from 'react'


const Authpage = () => {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex justify={"center"} alignitems={"center"}>
                <Box display={{ base: "none", md: "block" }}>
                    <Image src='/auth.png' alt='phone img' />
                </Box>
                 <VStack spacing={4} align={"stretch"}>
                    <AuthForm />
                    <Box textAlign={"center"}>Get The App</Box>
                    <Flex gap={5} justifyContent={"center"}>
                        <Image src='playstore.png' height={10} alt='playstore' />
                        <Image src="microsoft.png" height={10} alt="microsoft" />
                    </Flex>
                     </VStack>
               </Flex>
            </Container>
        </Flex>

    )


}

export default Authpage