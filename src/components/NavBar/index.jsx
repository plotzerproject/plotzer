import { FaCommentAlt, FaUserFriends, FaRegCalendarAlt, FaArchive } from 'react-icons/fa';
import { Divider, Flex, Icon, Image, Spacer, VStack } from "@chakra-ui/react";
import LogoCircle from "../../assets/logo_circle.svg";

function NavBar() {
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
            alt="Dan Abramov"
          />
          <Divider orientation="horizontal" borderColor="gray.300" w={"32px"} />
          <VStack>
            <Icon as={FaCommentAlt} color={'white'} w="32px" h="32px" />
            <Spacer />
            <Icon as={FaUserFriends} color={'white'} w="32px" h="32px" />
            <Spacer />
            <Icon as={FaRegCalendarAlt} color={'white'} w="32px" h="32px" />
            <Spacer />
            <Icon as={FaArchive} color={'white'} w="32px" h="32px" />
          </VStack>
        </VStack>
      </Flex>
    </nav>
  );
}
export default NavBar;
