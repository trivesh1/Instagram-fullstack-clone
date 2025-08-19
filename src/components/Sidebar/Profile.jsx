import {  Avatar, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { RxAvatar } from "react-icons/rx";
const Profile = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
	
<Link
	as={RouterLink}
	to={`/${authUser?.username}`}
	display="flex"
	alignItems="center"
	gap={4}
	_hover={{ bg: "whiteAlpha.400" }}
	borderRadius={6}
	p={2}
	w={{ base: 10, md: "full" }}
	justifyContent={{ base: "center", md: "flex-start" }}
>
	<RxAvatar size={30}/>
	<Box display={{ base: "none", md: "block" }}>Profile</Box>
</Link>
	
	);
};

export default Profile;