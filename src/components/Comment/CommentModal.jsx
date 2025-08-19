

import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, CloseButton, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import Comment from './Comment';
import usePostComment from '@/hooks/usePostComment';
import { useRef } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const CommentModal = (post) => {
     const [open, setOpen] =useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const {isloading,handlePostComment}=usePostComment();
      const commentRef=useRef(null)
      const handleSubmitComment=async (e)=>{
       e.preventDefault()
       await handlePostComment(post.post.id,commentRef.current.value)
       commentRef.current.value=' '
      }
   

  

  return (
    <>
      {post.post.comments.length !== 0 && (<Text fontSize={"sm"} cursor={"pointer"} onClick={handleOpen} color={"gray"}>View All {post.post.comments.length} comments </Text>)}
                        
     <Modal
        open={open}
        onClose={handleOpen}
       
      >
        <Box sx={style}>
          <Flex justifyContent={"space-between"}  alignItems={"center"}>
          <Typography  variant="h6" component="h2">
           Comments
          </Typography>
          <CloseButton onClick={handleClose}/>
          </Flex>
          <Flex mb={4} gap={4} flexDir={"column"} maxH={250} overflowY={"auto"} >
            {post.post.comments.map((comment,idx)=>(
                <Comment comment={comment} key={idx}/>
            )

            )}
          </Flex>
      
            <form onSubmit={handleSubmitComment}  >
           <Input placeholder='Comment' ref={commentRef} />

           <Flex justifyContent={"flex-end"}>
          <Button loading={isloading} type='submit' my={4} variant={"ghost"}>Post</Button>
          </Flex>
          </form>
        </Box>
      </Modal>
      </>
    
  )
}

export default CommentModal


// import * as React from 'react';
// import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { Button, CloseButton, Flex, Input } from '@chakra-ui/react';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'black',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function CommentModal( open,handleClose, post) {




  

//   return (
//     <div>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
       
    //   >
    //     <Box sx={style}>
    //         <Flex justifyContent={"space-between"}  alignItems={"center"}>
    //       <Typography  variant="h6" component="h2">
    //        Comments
    //       </Typography>
    //       <CloseButton onClick={handleClose}/>
    //       </Flex>
    //       <Typography  sx={{ mt: 2 }}>
    //        <Input placeholder='Comment'/>
    //       </Typography>
    //       <Button variant={"ghost"}>Post</Button>
    //     </Box>
    //   </Modal>
//     </div>
//   );
// }
