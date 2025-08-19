import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import SideBar from '@/components/Sidebar/SideBar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import Navbar from '@/components/Navebar/Navbar'



const PageLayout = ({ children }) => {
    const location=useLocation();
    const pathname = location.pathname;
    const [user,loading, error]=useAuthState(auth)
    const canRenderSideBar=pathname !=="/auth"&&user ;
    const canRenderNavbar = !user &&!loading && pathname !=="/auth";
    const chekinguserAuthintication=!user&&loading;
    if(chekinguserAuthintication) return <PageLayoutSpinner/>
    return (
        <>
            <Flex flexDir={canRenderNavbar?"column":"row"}>
                {canRenderSideBar?(
                <Box w={{base:"70px",md:"240px"}}>
                   <SideBar/>
                </Box>):null
                }
                {canRenderNavbar ? <Navbar/>:null}
                 
                
                <Box flex={1} w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }} mx={"auto"}>
                    {children}
                </Box>


            </Flex>
        </>
    );
    ;
}

export default PageLayout
const PageLayoutSpinner=()=>{
    return (
        <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Spinner size={"xl"}/>
        </Flex>
    )
}