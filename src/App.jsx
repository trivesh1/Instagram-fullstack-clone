import {  HStack } from "@chakra-ui/react"
import { ClientOnly,  Skeleton } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"

import { Navigate, Route, Routes } from "react-router"
import HomePage from "../pages/HomePage/HomePage"
import AuthPage from "../pages/Auth/Authpage"
import PageLayout from "./Layout/pagelayout/pagelayout"
import Profile from "../pages/profile/profile"
import useAuthStore from "./store/authStore"





function App() {
  const { toggleColorMode, colorMode } = useColorMode()
  const authUser=useAuthStore(state=>state.user)
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage/>:<Navigate to ="/auth"/> } />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/"/>} />
          <Route path="/:username" element={<Profile/>} />
        </Routes>
        <HStack>
          <ClientOnly fallback={<Skeleton boxSize="8" />}>
          
        
          
          </ClientOnly>
          
        </HStack>
      </PageLayout>
    </>
  )
}

export default App
