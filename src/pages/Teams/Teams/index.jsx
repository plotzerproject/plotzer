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

  //modal data
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //modal attributes
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleCreateTeam(e) {
    e.preventDefault();
    if (name !== "" && area !== "" && description !== "" && privacy !== "") {
      try {
        const response = await api.post("/team", {
          name,
          area,
          description,
          privacy,
        });
        setSuccess(true);

        setName("");
        setPrivacy("");
        setArea("");
        setDescription("");

        onClose();

        alert("Created!");
        //todo
        setTimeout(() => {
          setSuccess(false);
        }, 60 * 500);

        console.log(response);
      } catch (err) {
        console.log(err);
        setError(err);
        alert(error);
      }
    } else {
      setError("campos vazios");
      alert(error);
    }
  }

  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMyTeams() {
      setLoading(true);
      try {
        const teams = await api.get("/user/teams/");
        setMyTeams(teams.data);
      } catch (error) {
        console.log("algum erro", error);
      }
      setLoading(false);
    }
    getMyTeams();
  }, []);

  //pegar todos as equipes DO USUARIO (aqui tao todas só msm pelo teste)

  return (
    <Base>
      <Flex w="100%" justifyContent="center">
        {loading ? (
          <Loading />
        ) : (
          <Flex wrap={"wrap"} overflowY="auto" maxWidth={"1090px"} w="100%">
            {myTeams.map((item, indice) => {
              return (
                <Box
                  w="100%"
                  maxW={"250px"}
                  h="290px"
                  bgColor={"gray.300"}
                  key={item._id}
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
                    onClick={() => navigate(`/teams/${item._id}`)}
                    >
                      <Box
                        w="150px"
                        h="150px"
                        bgColor="gray.500"
                        textAlign={"center"}
                      >
                        {item.photo ? (
                          <img src={item.photo} alt={`${item.name}'s logo`} />
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
                            {getInitials(item.name)}
                          </Heading>
                        )}
                      </Box>
                      <Text fontSize={"xl"} textAlign="center">
                        {item.name}
                      </Text>
                    </VStack>
                    <HStack
                      h="50px"
                      w="100%"
                      justifyContent="space-between"
                      borderTop={"1px solid black"}
                      padding="10px 10px 5px 10px"
                    >
                      <Tooltip label="Settings" placement="bottom">
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Settings"
                          fontSize={"24px"}
                          icon={<SettingsIcon />}
                        />
                      </Tooltip>
                      <HStack>
                        <Tooltip label="See Members" placement="bottom">
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="See Members"
                            fontSize={"24px"}
                            icon={<FaUserFriends />}
                          />
                        </Tooltip>
                        <Tooltip label="Fixed" placement="bottom">
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Fixed"
                            fontSize={"24px"}
                            icon={<BsPinAngleFill />}
                          />
                        </Tooltip>
                      </HStack>
                    </HStack>
                  </Flex>
                </Box>
              );
            })}
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
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
              {success && (
                <Alert status="success" variant="subtle">
                  <AlertIcon />
                  The team was created with successful!
                </Alert>
              )}
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create a team</ModalHeader>
                <Divider w="100%" />
                <ModalCloseButton />
                <form onSubmit={handleCreateTeam}>
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
