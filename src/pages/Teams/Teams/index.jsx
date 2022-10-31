import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  FormControl,
  useDisclosure,
  Textarea,
  Select,
  Divider,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  AlertTitle,
  AlertDescription,
  ButtonGroup,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import Base from "../../../components/Base";
import { api } from "../../../services/api";
import { getInitials } from "../../../utils/strings";
import { FaUserFriends } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";

function Teams() {
  //todo: sucess message!!!

  const navigate = useNavigate();

  //modal create data
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  //modal open fixed
  const [teamSelected, setTeamSelected] = useState({})

  //modal attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenFixedModal, onOpen: openFixedModal, onClose: closeFixedModal } = useDisclosure();

  async function handleCreateTeam(e) {
    e.preventDefault();
    if (name !== "" && area !== "" && description !== "" && privacy !== "" && slug !== "") {
      try {
        const res = await api.post("/team", {
          name,
          area,
          description,
          privacy,
          slug
        });

        console.log(res)
        setSuccess(true);

        setName("");
        setPrivacy("");
        setArea("");
        setDescription("");
        setSlug("");
        setError({});

        onClose();

        // getMyTeams()
        navigate(`/teams/${res.data.data.id}`)

      } catch (err) {
        console.log(err);
        setError(err);
        // console.log
      }
    } else {
      setError("campos vazios");
      alert("campos vazios");
    }
  }

  async function getMyTeams() {
    setLoading(true);
    try {
      const teamsReq = await api.get("/user/@me/teams/");
      setMyTeams(teamsReq.data.data);
    } catch (error) {
      if (error.response.data.errors[0].title === "ERR_USER_DOES_NOT_HAVE_TEAM") {
        setError({
          title: "Equipe",
          subtitle: error.response.data.errors[0].title,
          detail: error.response.data.errors[0].detail
        })
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getMyTeams();
  }, []);

  async function openFixed(id) {
    setTeamSelected({})
    const t = myTeams.find((t) => t.id === id)
    setTeamSelected(t)
    openFixedModal()
  }

  return (
    <Base>
      <Flex w="100%" justifyContent="center">
        {loading ? (
          <Loading />
        ) : (
          <Flex flexWrap={'wrap'} margin={'0 auto'} w="100%" >
            {/* {
              Object.keys(error).length !== 0 && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{error.title}</AlertTitle>
                  <AlertDescription>{error.detail}</AlertDescription>
                </Alert>
              )
            } */}

            {myTeams.map((item, indice) => {
              return (
                <Box
                  // w="100%"
                  // maxW={"250px"}
                  w="250px"
                  h="290px"
                  bgColor={"gray.300"}
                  key={item.id}
                  boxShadow="lg"
                  borderRadius={"md"}
                  borderColor="gray.400"
                  borderWidth={"0.1px"}
                  margin="0 15px"
                  cursor={"pointer"}
                >
                  <Flex
                    w="100%"
                    h="100%"
                    justifyContent={"space-between"}
                    flexDir="column"
                  >
                    <VStack
                      w="100%"
                      justifyContent={"center"}
                      h="calc(100% - 50px)"
                      onClick={() => navigate(`/teams/${item.id}`)}
                    >
                      <Box
                        w="150px"
                        h="150px"
                        bgColor="gray.500"
                        textAlign={"center"}
                      >
                        {item.attributes.photo ? (
                          <img src={item.attributes.photo} alt={`${item.attributes.name}'s logo`} />
                        ) : (
                          <Heading
                            h="100%"
                            w="100%"
                            alignItems="center"
                            justifyContent={"center"}
                            textAlign="center"
                            fontSize="5xl"
                            as="h2"
                          >
                            {getInitials(item.attributes.name)}
                          </Heading>
                        )}
                      </Box>
                      <Text fontSize={"xl"} textAlign="center">
                        {item.attributes.name}
                      </Text>
                    </VStack>
                    <HStack
                      h="50px"
                      w="100%"
                      justifyContent="space-between"
                      borderTop={"1px solid black"}
                      padding="10px 10px 5px 10px"
                    >
                      {/* <Tooltip label="Settings" placement="bottom">
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Settings"
                          fontSize={"24px"}
                          icon={<SettingsIcon />}
                        />
                      </Tooltip> */}
                      <HStack>
                        <Tooltip label="See Members" placement="bottom">
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="See Members"
                            fontSize={"24px"}
                            icon={<FaUserFriends />}
                            onClick={() => { navigate(`/teams/${item.id}/members`) }}
                          />
                        </Tooltip>
                        <Tooltip label="Fixed" placement="bottom">
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Fixed"
                            fontSize={"24px"}
                            onClick={() => openFixed(item.id)}
                            icon={<BsPinAngleFill />}
                          />
                        </Tooltip>
                      </HStack>
                    </HStack>
                  </Flex>
                </Box>
              );
            })
            }

            <Box
              w="100%"
              maxW={"250px"}
              h="290px"
              bgColor={"gray.300"}
              borderRadius={"md"}
              borderColor="gray.400"
              borderWidth={"0.1px"}
              margin="0 15px"
              cursor={"pointer"}
              onClick={() => alert("Proximas atualizações")}
            >
              <Flex
                w="100%"
                h="100%"
                justifyContent={"space-between"}
                flexDir="column"
              >
                <VStack w="100%" justifyContent={"center"} h="100%">
                  <Box w="150px" h="150px">
                    <Icon as={FaPlusSquare} fontSize="150px" />
                  </Box>
                  <Heading fontSize={"xl"}>Join a team</Heading>
                </VStack>
              </Flex>
            </Box>
            <Box
              w="100%"
              maxW={"250px"}
              h="290px"
              bgColor={"gray.300"}
              borderRadius={"md"}
              borderColor="gray.400"
              borderWidth={"0.1px"}
              margin="0 15px"
              cursor={"pointer"}
              onClick={onOpen}
            >
              <Flex
                w="100%"
                h="100%"
                justifyContent={"space-between"}
                flexDir="column"
              >
                <VStack w="100%" justifyContent={"center"} h="100%">
                  <Box w="150px" h="150px">
                    <Icon as={FaPlusSquare} fontSize="150px" />
                  </Box>
                  <Heading fontSize={"xl"}>Create a team</Heading>
                </VStack>
              </Flex>
            </Box>
            {
              Object.keys(teamSelected).length !== 0 && <Modal isOpen={isOpenFixedModal} onClose={closeFixedModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{teamSelected.attributes.name} Fixed's</ModalHeader>
                  <Divider w="100%" />
                  <ModalCloseButton />
                  <ModalBody>
                    {
                      Object.keys(teamSelected.attributes.fixed).length !== 0 ? teamSelected.attributes.fixed.slice(0, 6).map((f) => {
                        return (
                          <HStack key={f._id} w="100%" h="50px" bg={'gray.300'} mt="10px" p="8px" borderRadius={'4px'} boxShadow='md'>
                            <Text>{f.title}</Text>
                          </HStack>
                        )
                      }) :
                        <Alert status='error'>
                          <AlertIcon />
                          <AlertDescription>Fixed's not found.</AlertDescription>
                        </Alert>
                    }
                  </ModalBody>

                  <ModalFooter justifyContent={'space-between'}>
                    <ButtonGroup>
                      <Button variant={'ghost'} colorScheme="blue" mr={3} onClick={closeFixedModal}>
                        Close
                      </Button>
                    </ButtonGroup>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            }

            <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
              {success && (
                <Alert status="success" variant="subtle">
                  <AlertIcon />
                  The team was created with successful!
                </Alert>
              )}
              <ModalOverlay />
              <ModalContent>
                <form onSubmit={handleCreateTeam}>
                  <ModalHeader>Create a team</ModalHeader>
                  <Divider w="100%" />
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="Team's name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Area</FormLabel>
                      <Input
                        placeholder="Team's area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        placeholder="Team's description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Privacy</FormLabel>
                      <Select
                        placeholder="Select the team's privacy"
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                      >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="only-invites">Only Invites</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Slug</FormLabel>
                      <Input
                        placeholder="Team's slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                      Save
                    </Button>
                    <Button onClick={onClose} textColor="white">
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </Flex>
        )}
      </Flex>
    </Base>
  );
}

export default Teams;
