import { SearchLogo } from "@/assets/contant";
import useSearch from "@/hooks/useSearch";
import { Box, Flex, Input} from "@chakra-ui/react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useRef, useState } from "react";

import SuggestedUser from "../Suggesteds/SuggestedUser";


const Search = () => {
    const [open, setOpen] = useState(false)
    const {isLoading,SearchUser,user,setUser}=useSearch();
    const searchRef=useRef(null)
    const handleSearchUser= (e)=>{
        e.preventDefault();
        SearchUser(searchRef.current.value);


    };
   
    return (
        <>
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
                         <SearchLogo />
                        <Box display={{ base: "none", md: "block" }}>Search</Box>
                    </Flex>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Search User</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <form onSubmit={handleSearchUser}>
                                Username
                                <Input ref={searchRef} m={2}placeholder="_asaprogrammer"></Input>
                                <Button display={"flex-end"} type="submit" loading={isLoading}>Search</Button>
                                  </form>
                                  <Flex p={2}>
                                  {user&&<SuggestedUser user={user} setUser={setUser}/>}
                                  </Flex>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Close</Button>
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

export default Search;
