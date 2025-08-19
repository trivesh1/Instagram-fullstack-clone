
import useSignIn from "@/hooks/useSignIn"
import {  Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import { Alert } from "@chakra-ui/react"


const Login = () => {
    const [inputs , setInput]=useState({
        email:"",
        password:"",
    })
    const {loading,error,login}=useSignIn();
  return (
    <>
    <Input placeholder="Email"
    type="email"
    fontSize={14}
    size={"sm"}
    value={inputs.email}
    onChange={(e)=>setInput({...inputs,email:e.target.value})}
    >
    </Input>
    <Input fontSize={14}
    placeholder="password"
    size={"sm"}
    value={inputs.password}
    onChange={(e)=>setInput({...inputs,password:e.target.value})}>
    </Input>
    {error&&(
      <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Invalid Fields</Alert.Title>
        <Alert.Description>
        {error.massage}
        
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
    

    )}
   
    <Button w={"full"} size={"sm"} fontSize={14} bgColor={"blue.500"}
    onClick={()=>login(inputs)}
    loading={loading}
    
    >Login</Button>
    
    </>
  )
}

export default Login