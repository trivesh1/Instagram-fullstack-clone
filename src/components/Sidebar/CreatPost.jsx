

import { CreatePostLogo } from "@/assets/contant";
import { firebase } from "@/firebase/firebase";
import usePreviewImg from "@/hooks/usePreviewImg";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import useUserProfileStore from "@/store/userProfileStore";
import { Box, Flex, Image, Input, Textarea, } from "@chakra-ui/react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const CreatePost = () => {
    const [open, setOpen] = useState(false)
    const { loading, handleCreatePost } = useCreatePost()
    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, caption)
            // onClose()
            // setCaption(" ")
            // setSelectedFile(null)
        } catch (error) {
            alert(error)

        }

    }
    const [caption, setCaption] = useState("")
    const Ref = useRef(null)
    const { selectedFile, handleImagechange, setSelectedFile } = usePreviewImg()
   
    return (
        <>

            {/* <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                >
                  		
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex> */}
            <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Dialog.Trigger asChild>
                    <Flex
                        alignItems={"center"}
                        gap={4}
                        _hover={{ bg: "whiteAlpha.400" }}
                        borderRadius={6}
                        p={2}
                        w={{ base: 10, md: "full" }}
                        justifyContent={{ base: "center", md: "flex-start" }}
                    >
                        <CreatePostLogo />
                        <Box display={{ base: "none", md: "block" }}>Create</Box>
                    </Flex>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create Post</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <form >
                                    <Textarea value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="Post caption..." />
                                    <Input type="file" hidden ref={Ref} onChange={handleImagechange} />
                                    <BsFillImageFill
                                        onClick={() => Ref.current.click()}
                                        style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                                        size={16}
                                    />
                                </form>


                                {selectedFile && (
                                    <Flex mt={5} w={'full'} position={"relative"} justifyContent={"center"}>
                                        <Image src={selectedFile} alt={"image"} />
                                        <CloseButton bgColor={"black"} position={"absolute"}
                                            top={2}
                                            right={2}
                                            onClick={() => {
                                                setSelectedFile('')
                                            }} />
                                    </Flex>
                                )
                                }
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" onClick={handlePostCreation} loading={loading} >Post</Button>
                                </Dialog.ActionTrigger>

                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>





        </>
    );
};

export default CreatePost;

function useCreatePost() {
    const [loading, isLoading] = useState(false);
    const authUser = useAuthStore(state => state.user)
    const createPost = usePostStore(state => state.createPost)
    const addPost = useUserProfileStore(state => state.addPost)
    const pathaname = useLocation();
    const userProfile=useUserProfileStore(state=>state.userProfile)


    const handleCreatePost = async (selectedFile, caption) => {
        if (!selectedFile) throw new Error("Please Select An Image");

        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createBy: authUser.uid,
        }
        try {
            isLoading(true)
            const postDocRef = await addDoc(collection(firebase, "posts"), newPost)
            const userDocRef = doc(firebase, "users", authUser.uid)
            // const imageRe
            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) })
            await updateDoc(postDocRef, { imageURL: selectedFile })
            newPost.imageURL = selectedFile;
             if(userProfile.uid===authUser.uid)  createPost({ ...newPost, id: postDocRef.id })
            if(pathaname.pathname !== "/" && userProfile.uid===authUser.uid) addPost({ ...newPost, id: postDocRef.id })
            alert('Success')

        } catch (error) {
         alert("there is an error")
} 
finally {
            isLoading(false)
        }

    }
    return { loading, handleCreatePost }

}