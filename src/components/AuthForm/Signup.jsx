
import useSignupwithEmail from '@/hooks/useSignupwithEmail'
import { Button, Input, Group } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Alert } from "@chakra-ui/react"

const Signup = () => {
    const [inputs , setInput]=useState({
           fullname:"",
           username:"",
            email:"",
            password:"",
            
        })
     const {loading,error,signup
     }=useSignupwithEmail()
    const [visibilty,setVisibility]=useState(false)
  return (
   <>
   
       <Input placeholder="Email"
       type="email"
       size={"sm"}
       fontSize={14}
       value={inputs.email}
       onChange={(e)=>setInput({...inputs,email:e.target.value})}
       >
       </Input>
       <Input placeholder="Full Name"
       size={"sm"}
       type="text"
       fontSize={14}
       value={inputs.fullname}
       onChange={(e)=>setInput({...inputs,fullname:e.target.value})}
       >
       </Input>
       <Input 
       size={"sm"}
       placeholder="UserName"
       type="text"
       fontSize={14}
       value={inputs.username}
       onChange={(e)=>setInput({...inputs,username:e.target.value})}
       >
       </Input>
      <Group w={"full"}>
       <Input 
       size={"sm"}
       fontSize={14}
       type={visibilty?"text":"password"}
       placeholder="password"
       value={inputs.password}
       onChange={(e)=>setInput({...inputs,password:e.target.value})}> 
       </Input>
       <Button  size="sm"variant={"ghost"} onClick={()=>setVisibility(!visibilty)}>
        {visibilty?"Hide":"Show"}
       </Button>
      
      
      
      </Group>
      {error &&(
        <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Invalid Fields</Alert.Title>
        <Alert.Description>
          Your form has some errors. Please fix them and try again.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>

      )}
      

      
       <Button w={"full"} size={"sm"} fontSize={14} bgColor={"blue.500"} onClick={()=>signup(inputs)}
        loading={loading}
        >Sign Up</Button>
       
       </>


   
  )
}

export default Signup