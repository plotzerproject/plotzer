import { BellIcon, ChevronDownIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";

function Header({ page, user }) {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      bgColor={"blue.400"}
      h="80px"
      w={"100%"}
      p="0 20px"
    >
      <Box p="2">
        <Heading size="md" color={"white"} lineHeight="6" fontWeight="normal">
          <strong>{page}</strong>
        </Heading>
      </Box>
      <Spacer />
      <Icon as={BellIcon} w="32px" h="32px" color="white" />
      <Icon as={MoonIcon} w="32px" h="32px" color="white" />
      <Divider orientation="vertical" borderColor="gray.300" h={"32px"} />
      <Text fontSize="md" color="white">
        {user.name}
      </Text>
      <Avatar name={user.name} size="md" src={user.photo} />
      <Icon as={ChevronDownIcon} w="32px" h="32px" color={"white"} />
    </Flex>
  );
}
export default Header;
