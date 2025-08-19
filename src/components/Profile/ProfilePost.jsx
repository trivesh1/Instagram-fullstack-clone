import { Button, CloseButton, Flex, GridItem, Image, Text, VStack, } from '@chakra-ui/react'
import React from 'react'
import { Avatar } from "@chakra-ui/react"
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { useState } from "react"
import Box from '@mui/material/Box';
import { MdDelete } from "react-icons/md";
import Modal from '@mui/material/Modal';
import { Separator } from "@chakra-ui/react"
import Comment from '../Comment/Comment'
import Postfooter from '../Feedpost/Postfooter'
import useUserProfileStore from '@/store/userProfileStore'
import useAuthStore from '@/store/authStore'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { firebase } from '@/firebase/firebase'
import usePostStore from '@/store/postStore'
import Caption from '../Comment/Caption'
import { Link } from 'react-router-dom'


const ProfilePost = ({ post }) => {
    const userProfile = useUserProfileStore(state => state.userProfile)
    const authUser=useAuthStore(state=>state.user)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLoading,setIsLoading]=useState(false)
    const deletePost=usePostStore(state=>state.deletePost)
    const deletPostUpdate=useUserProfileStore(state=>state.deletePost)
    const handleDeletePost=async()=>{
       
        if(!window.confirm("Are You Sure you want to delete this post"))return;

        try {
            setIsLoading(true);
            const userRef=doc(firebase,"users", authUser.uid )
            await deleteDoc(doc(firebase,"posts",post.id))
            await updateDoc(userRef,{
                posts:arrayRemove(post.id)
            })
            deletePost(post.id)
            deletPostUpdate(post.id)
            alert("Post Deleted")
        } catch (error) {
            alert("there is an error")
            console.log(error)
            
        }
        finally{
            setIsLoading(false)
        }

    }

    const style = {
        position: 'absolute',
        top: '20%',
        left: '25%',
        bottom: "25%",
        right: "25%",
    };


    return (
        <>

            <GridItem
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={"1/1"}
                onClick={handleOpen}

            >

                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={"blackAlpha.700"}
                    transition={"all 0.3s ease"}
                    zIndex={1}
                    justifyContent={"center"}

                >
                    <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeigth={"bold"} ml={1}>{post.likes.length}</Text>
                        </Flex>
                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeigth={"bold"} ml={1}>{post.comments.length}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Image src={post.imageURL} alt='user pic' w={"100%"} h={"100%"} objectFit={"cover"} />





            </GridItem>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} >
                    <Flex bgColor={"black"} gap={4} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
                        <Flex borderRadius={4}
                            overflow={'hidden'}
                            border={"1px solid"}
                            borderColor={"whiteAlpha.300"}
                            flex={1.5}
                            justifyContent={"center"}
                            alignItems={"center"}>
                            <Image src={post.imageURL} alt='profilepic ' />
                        </Flex>
                        <Flex
                            flex={1}
                            flexDir={"column"}
                            px={10}
                            display={{ base: "none", md: "flex" }}

                        >
                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                           
                                <Flex alignItems={"center"} gap={4}>
                                    <Link to={`/${userProfile.username}`}>
                                    <Avatar.Root>
                                        <Avatar.Fallback />
                                        <Avatar.Image src={userProfile.profilePicUrl} />
                                    </Avatar.Root>
                                    </Link>
                                      <Link to={`/${userProfile.username}`}>
                                    <Text fontWeight={"bold"}
                                        fontSize={12}>
                                        {userProfile.username}
                                       

                                    </Text>
                                     </Link>
                                </Flex>
                                <Flex alignItems={"center"} justifyContent={"center"}>
                                  {authUser?.uid===userProfile.uid&&(  <Button loading={isLoading} bg={"transparent"} color={"white"}
                                    _hover={{bg:"whiteAlpha.300",color:"red.600"}}
                                    onClick={handleDeletePost}
                                    > <MdDelete  size={20} cursor={"pointer"} />
                                     </Button>)}
                                   
                                      <CloseButton onClick={handleClose} />
                                     
                                    
                                </Flex>
                              
                            </Flex>
                            <Separator my={4} size="lg" />
                            <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                {post.caption&&<Caption post={post}/>}
                                {post.comments.map(comment=>(
                                    <Comment key={comment.id} comment={comment}/>
                                ))}

                            </VStack>
                            <Separator my={4} size="lg" />
                            <Postfooter isProfile={true} post={post} />

                        </Flex>

                    </Flex>
                </Box>
            </Modal>





        </>
    )
}

export default ProfilePost
