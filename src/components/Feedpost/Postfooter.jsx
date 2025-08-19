import { CommentLogo, NotificationsLogo, UnlikeLogo } from '@/assets/contant';
import useLikePost from '@/hooks/useLikePost';
import usePostComment from '@/hooks/usePostComment';
import useAuthStore from '@/store/authStore';
import { timeAgo } from '@/Utils/timeAgo';
import { Box, Button, Flex, Input, Group, Text, CloseButton, } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useState } from 'react';
import CommentModal from '../Comment/CommentModal';


const Postfooter = ({ post, CreatedBy, isProfile }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open)
    }

   

    const { isLoading, isLiked, handleLike, likes } = useLikePost(post);

    const { isloading, handlePostComment } = usePostComment()
    const [comment, setCommment] = useState('')
    const authUser = useAuthStore(state => state.user)
    const commentRef = useRef(null)
    const handelcommenting = async () => {
        await handlePostComment(post.id, comment)
        setCommment(" ")
    }

    return (
        < Box m={10} mt={"auto"}>
            <Flex alignItems={"center"} w={"full"} gap={4} pt={0} mb={2} mt={4}>
                <Box onClick={handleLike}
                    cursor={"pointer"}
                    fontSize={18}
                >

                    {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
                </Box>
                <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()} >
                    <CommentLogo />

                </Box>
            </Flex>

            <Text fontWeight={600} fontSize={"sm"}>
                {likes} Likes
            </Text>
            {isProfile && (<Text fontSize={12} color={"gray"}>
                Posted {timeAgo(post.createdAt)}

            </Text>)}
            {!isProfile && (
                <>
                    <Text fontSize={'sm'} fontWeight={700}>
                        {CreatedBy.username}
                        <Text px={2}
                            as='span' fontWeight={400}>

                            {post.caption}
                        </Text>
                    </Text>
                    <CommentModal post={post} />

                </>
            )}
            <Flex alignItems={"center"}
                gap={2}
                justifyContent={"space-between"}
                w={"full"}>
                {authUser && <>
                    <Group w={"full"}>
                        <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14}
                            onChange={(e) => setCommment(e.target.value)}
                            ref={commentRef}
                            value={comment} />

                        <Button
                            loading={isloading}
                            fontSize={14}
                            color={"blue.500"}
                            fontWeight={600}
                            cursor={"pointer"}
                            _hover={{
                                color: "white",
                            }}
                            bg={"transparent"}
                            onClick={handelcommenting}
                        >Post</Button>



                    </Group>
                </>}
            </Flex>



        </Box>
    )

}

export default Postfooter