import { BellIcon, CheckIcon, ChevronDownIcon, MoonIcon } from "@chakra-ui/icons";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

function Header({ page }) {
  const { user, Logout } = useAuth();
  const [error, setError] = useState({})
  let navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const [chegouNotificacao, setChegouNotificacao] = useState(false)
  const [notifications, setNotifications] = useState([])

  async function getNotifications() {
    try {
      const requests = await api.get("/user/@me/requests")
      setNotifications(requests.data.data)
      return requests
    } catch (err) {
      setError(err.message)
    }
  }

  // useEffect(()=>{
  //   async function exec(){
  //     await getNotifications()

  //     setChegouNotificacao(true)
  //     setTimeout(() => {
  //       setChegouNotificacao(false)
  //     }, 3000);
  //   }
  //   exec()
  // }, [getNotifications])

  async function openNotifications() {
    try {
      await getNotifications()
      // navigate("/notifications")
      onOpen()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleAcceptInvite(id_team){
    try {
      const accept = await api.post(`/team/accept/${id_team}`)
      openNotifications()
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    }
  }

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      bgColor={"blue.400"}
      h="80px"
      w={"100%"}
      p="0 20px"
    // pos="fixed"
    // left={'0'}
    // top={'0'}
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
          ref={btnRef}
          color={chegouNotificacao ? "red" : "white"}
          icon={<BellIcon />}
          onClick={openNotifications}
        />
      </Tooltip>
      <Tooltip label="Color Theme" placement="bottom">
        <IconButton
          aria-label="Color Theme"
          fontSize="32px"
          variant={'ghost'}
          color='white'
          icon={<MoonIcon />}
          onClick={() => alert("Próximas Atualizações")}
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
            // onClick={() => {
            //   navigate("/settings");
            // }}
            onClick={() => alert("Próximas Atualizações")}
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
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notificações</DrawerHeader>

          <DrawerBody>
            {
              notifications.length !== 0 ? notifications.map((notification) => {
                return <Flex key={notification.id} w="100%" bgColor={'gray.200'} p="12px">
                  <HStack align={'center'}>
                    <Avatar
                      size='md'
                      name={notification.attributes.user.name}
                      src={notification.attributes.user.photo}
                    />
                    <HStack>

                      <Heading fontSize={'md'}>
                        {notification.attributes.user.name} te convidou para entrar em "{notification.attributes.team.name}"
                      </Heading>
                      <Tooltip label="Aceitar Convite" placement="bottom">
                      <IconButton
                        aria-label="Aceitar Convite"
                        fontSize="32px"
                        color='white'
                        icon={<CheckIcon />}
                        onClick={()=>handleAcceptInvite(notification.attributes.team.id)}
                      />
                      </Tooltip>
                    </HStack>
                  </HStack>
                </Flex>
              }) : <Text>Nenhuma requisição</Text>
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Sair
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
export default Header;
