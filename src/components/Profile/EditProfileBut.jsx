import { useRef, useState } from 'react'
import { Avatar, Button, Flex, Input, Text } from "@chakra-ui/react"
import {   CloseButton, Dialog,  Portal } from "@chakra-ui/react"
import useAuthStore from '@/store/authStore'
import usePreviewImg from '@/hooks/usePreviewImg'
import useEditprofile from '@/hooks/useEditprofile'
 

const EditProfileBut = () => {
   
      const [input , setInputs]=useState({
        fullname:"",
        username:"",
        bio:"",
      })
        const {editUSerProfile,isUpdating}=useEditprofile()
      const handleEditProfile= async ()=>{
        try {
            await editUSerProfile(input,selectedFile,setSelectedFile)
            setSelectedFile(null)
            
        } catch (error) {
            console.log(error);
        }
          
        }
        const {handleImagechange,selectedFile,setSelectedFile}=usePreviewImg();
        const FileRef=useRef(null)
       
    const authUser=useAuthStore(state=>state.user);
    return (
        <>
            <Dialog.Root >
                <Dialog.Trigger asChild>
                    <Button variant="outline" bg={"white"} color={"black"} _hover={{
                        bg: "whiteAlpha.800"
                    }}
                        size={{ base: "xs", md: "sm" }}>
                        Edit Profile

                    </Button>

                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Edit Profile</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Flex justifyContent={"space-between"} mx={"auto"} alignItems={"center"}>
                                    <Avatar.Root size={"2xl"}>
                                      <Avatar.Fallback  />
                                      <Avatar.Image src={selectedFile || authUser.profilePicUrl} />
                                    </Avatar.Root>
                                   <Button bgColor={"whiteAlpha.800"} onClick={()=>FileRef.current.click()}>Edit Profil Picture</Button>
                                   <Input type='file'onChange={handleImagechange} hidden ref={FileRef}/>
                                  </Flex>
                                  <Text my={4} fontSize={16}>Full Name
                                    <Input m={2} placeholder='Full Name'
                                    value={input.fullname||authUser.fullname}
                                    onChange={(e)=>setInputs({...input,fullname:e.target.value})}/>
                                  </Text>
                                
                                   <Text my={4} fontSize={16}>User Name
                                    <Input m={2} placeholder='User Name'
                                    value={input.username||authUser.username}
                                     onChange={(e)=>setInputs({...input,username:e.target.value})}/>
                                  </Text>
                                   <Text my={4} fontSize={16}>Bio
                                    <Input m={2} placeholder='Bio'
                                    value={input.bio||authUser.bio}
                                     onChange={(e)=>setInputs({...input,bio:e.target.value})}/>
                                  </Text>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" onClick={setSelectedFile}>Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button loading={isUpdating} onClick={handleEditProfile}>Save</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default EditProfileBut