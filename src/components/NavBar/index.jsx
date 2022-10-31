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
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import LogoCircle from "../../assets/logo_circle.svg";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav>
      <Flex
        justifyContent={"center"}
        alignItems="top"
        width={"80px"}
        h="100vh"
        bgColor={"blue.400"}
        // pos="fixed"
        // left={'0'}
        // top={'0'}
      >
        <VStack marginTop={"16px"}>
          <Image
            borderRadius="full"
            boxSize="64px"
            src={LogoCircle}
            alt="Plotzer's Logo"
            onClick={() => navigate("/dashboard")}
            cursor="pointer"
          />
          <Divider orientation="horizontal" borderColor="gray.300" w={"32px"} />
          <VStack>
            <Tooltip label="Chat" placement="right">
              <IconButton
                color={"white"}
                variant="ghost"
                aria-label="Chat"
                fontSize="24px"
                onClick={() => {
                  navigate("/chat");
                }}
                icon={<FaCommentAlt />}
              />
            </Tooltip>
            <Spacer />
            <Tooltip label="My Teams" placement="right">
              <IconButton
                aria-label="My Teams"
                fontSize="24px"
                color={"white"}
                variant="ghost"
                onClick={() => {
                  navigate("/teams");
                }}
                icon={<FaUserFriends />}
              />
            </Tooltip>
            <Spacer />
            <Tooltip label="Calendar" placement="right">
              <IconButton
                aria-label="Calendar"
                fontSize="24px"
                color={"white"}
                variant="ghost"
                onClick={() => {
                  navigate("/calendar");
                }}
                icon={<FaRegCalendarAlt />}
              />
            </Tooltip>
            <Spacer />
            <Tooltip label="Methodologies" placement="right">
              <IconButton
                aria-label="Methodologies"
                fontSize="24px"
                color={"white"}
                variant="ghost"
                onClick={() => {
                  navigate("/methodologies");
                }}
                icon={<FaArchive />}
              />
            </Tooltip>
          </VStack>
        </VStack>
      </Flex>
    </nav>
  );
}
export default NavBar;
