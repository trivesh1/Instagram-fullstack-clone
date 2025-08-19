
import { Box,  Image,VStack, Flex ,Text} from '@chakra-ui/react'
import {useState} from "react";

import React from 'react'
import Login from './login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';



const AuthForm = () =>{
    const [islogin, setIsLogin]=useState(true);
  
    
  return (
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src="logo.png" height={24} cursor={"pointer"}/>   
            {!islogin ? <Signup/>
            :<Login/>}
            
            <Flex alignItems={"center"} justifyContet={"center"} my={4} gap={1} w={"full"}>  
                <Box flex={2} h={1} bg={"gray.400"}/>
                <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={1} bg={"gray.400"}/>
            </Flex>
          <GoogleAuth/>
        </VStack>
        <Box border={"1px solod gray"} borderRadius={4} padding={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box mx={2} fontSize={14}>
                    {islogin ? "Don't have an account?":"Already Have an account?"}
                </Box>
                <Box  border={1} onClick={()=>setIsLogin(!islogin)} color={"blue.500"}cursor={"pointer"} >
                    {islogin ? "Sign Up": "Login"}
                </Box>
            </Flex>
        </Box>

    </Box>
  )
}

export default AuthForm