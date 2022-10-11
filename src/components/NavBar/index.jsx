import {
  FaCommentAlt,
  FaUserFriends,
  FaRegCalendarAlt,
  FaArchive,
} from "react-icons/fa";
import {
  Divider,
  Flex,
  IconButton,
  Image,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import LogoCircle from "../../assets/logo_circle.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();

  async function handleChangePage(page) {
    await navigate(page);
  }

  return (
    <nav>
      <Flex
        justifyContent={"center"}
        alignItems="top"
        width={"80px"}
        h="100vh"
        bgColor={"blue.400"}
      >
        <VStack marginTop={"16px"}>
          <Image
            borderRadius="full"
            boxSize="64px"
            src={LogoCircle}
            alt="Plotzer's Logo"
          />
          <Divider orientation="horizontal" borderColor="gray.300" w={"32px"} />
          <VStack>
            <IconButton
              color={'white'}
              variant="ghost"
              aria-label="Chat"
              fontSize="24px"
              // onClick={handleChangePage("/chat")}
              icon={<FaCommentAlt />}
            />
            <Spacer />
            <IconButton
              aria-label="My Teams"
              fontSize="24px"
              color={'white'}
              variant="ghost"
              icon={<FaUserFriends />}
            />
            <Spacer />
            <IconButton
              aria-label="Calendar"
              fontSize="24px"
              color={'white'}
              variant="ghost"
              icon={<FaRegCalendarAlt />}
            />
            <Spacer />
            <IconButton
              aria-label="Methodologies"
              fontSize="24px"
              color={'white'}
              variant="ghost"
              icon={<FaArchive />}
            />
          </VStack>
        </VStack>
      </Flex>
    </nav>
  );
}
export default NavBar;
