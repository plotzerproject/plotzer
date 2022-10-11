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
} from "@chakra-ui/react";
import { FaPlusSquare } from "react-icons/fa";
import Base from "../../../components/Base";
import { getInitials } from "../../../utils/strings";
import teams from "../../../utils/teams";

function Teams() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //pegar todos as equipes DO USUARIO (aqui tao todas só msm pelo teste)

  return (
    <Base>
      <Flex w="100%" justifyContent="center">
        <Flex wrap={"wrap"} overflowY="auto" maxWidth={"1090px"} w="100%">
          {teams.map((item, indice) => {
            return (
              <Box
                w="100%"
                maxW={"250px"}
                h="290px"
                bgColor={"gray.300"}
                key={indice}
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
                    <Box w="32px" h="32px" bgColor={"gray.100"}></Box>
                    <HStack>
                      <Box w="32px" h="32px" bgColor={"gray.100"}></Box>
                      <Box w="32px" h="32px" bgColor={"gray.100"}></Box>
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
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a team</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Team's name" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Area</FormLabel>
                  <Input placeholder="Team's area" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Team's description" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Privacy</FormLabel>
                  <Select placeholder="Select the team's privacy">
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="onlyInvites">Only Invites</option>
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose} textColor="white">
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Base>
  );
}

export default Teams;
