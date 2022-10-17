import { BellIcon, ChevronDownIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Tooltip,
} from "@chakra-ui/react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Header({ page }) {
  const { user, Logout } = useAuth();
  let navigate = useNavigate();

  console.log(user)

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
      <Tooltip label="Notifications" placement="bottom">
      <IconButton
          aria-label="Notifications"
          fontSize="38px"
          variant={'ghost'}
          color='white'
          icon={<BellIcon />}
        />
      </Tooltip>
      <Tooltip label="Color Theme" placement="bottom">
        <IconButton
          aria-label="Color Theme"
          fontSize="32px"
          variant={'ghost'}
          color='white'
          icon={<MoonIcon />}
        />
      </Tooltip>
      <Divider orientation="vertical" borderColor="gray.300" h={"32px"} />
      <Text fontSize="md" color="white">
        {user.name}
      </Text>
      <Tooltip label="Profile" placement="bottom">
        <Avatar
          name={user.name}
          cursor="pointer"
          size="md"
          src={user.photo}
          onClick={() => {
            navigate("/profile");
          }}
        />
      </Tooltip>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<ChevronDownIcon />}
          variant="ghost"
          fontSize={"32px"}
          colorScheme="gray"
          color={"white"}
          _hover={{ color: "black" }}
          _active={{ color: "black" }}
        />
        <MenuList>
          <MenuItem
            icon={<FiSettings fontSize={"20px"} />}
            onClick={() => {
              navigate("/settings");
            }}
          >
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<FiLogOut fontSize={"20px"} />}
            onClick={() => Logout()}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
export default Header;
