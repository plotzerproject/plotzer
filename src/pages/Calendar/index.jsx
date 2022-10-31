import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Assignment from "../../components/Assignment";
import Base from "../../components/Base";
import LoadingComponent from "../../components/LoadingComponent";
import { api } from "../../services/api";
import Loading from "../Loading";

function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true)
  const [assignments, setAssignments] = useState([])
  const [errorGetAssignment, setErrorGetAssignment] = useState({})

  const [teams, setTeams] = useState([])

  useEffect(() => {
    async function getMyAssignments() {
      setLoading(true);
      try {
        const req = await api.get("/assignment/@me/my-assignments/");
        setAssignments(req.data.data)

        const teamsReq = await api.get("/user/@me/teams")
        setTeams(teamsReq.data.data)

        setLoading(false)
      } catch (error) {
        console.log(error)
        if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
          setErrorGetAssignment({
            title: "Assignment",
            subtitle: error.response.data.errors[0].title,
            detail: error.response.data.errors[0].detail
          })
          setLoading(false)
        }
      }
    }

    getMyAssignments()
  }, [])

  return (

    <Base>
      <Tabs w="100%">
        <TabList justifyContent={"space-between"}>
          <HStack>
            <Tab>Next</Tab>
            <Tab>Completed</Tab>
            <HStack gap={2}>
              <Select placeholder="Filtrar por equipe" borderColor={"gray.400"} onChange={() => alert("next updates")}>
                <option value="team-1">Team 1</option>
                <option value="team-2">Team 2</option>
              </Select>
              <CheckboxGroup colorScheme="green" defaultValue={["assigments"]}>
                <Stack spacing={[1, 2]} direction={["column", "row"]}>
                  <Checkbox value="assigments">Assigments</Checkbox>
                  <Checkbox value="meetings">Meetings</Checkbox>
                </Stack>
              </CheckboxGroup>
            </HStack>
          </HStack>
          <Button textColor={"white"} onClick={onOpen}>
            Adicionar
          </Button>
        </TabList>

        {
          !loading ?
            <TabPanels>
              <TabPanel>
                {
                  assignments ?
                    assignments.map((item, indice) => {
                      return item.attributes.status === "received" ? <Assignment data={item} key={item.id} /> : null
                    }) :
                    <Alert status='error'>
                    <AlertIcon />
                    <AlertDescription>{errorGetAssignment.detail}</AlertDescription>
                  </Alert>
                }
              </TabPanel>
              <TabPanel>
                {
                  assignments ?
                    assignments.map((item, indice) => {
                      return item.attributes.status === "sent" || item.attributes.status === "returned" ? <Assignment data={item} key={item.id} /> : null
                    }) :
                    <Heading>{errorGetAssignment.detail}</Heading>
                }
              </TabPanel>
            </TabPanels> : <LoadingComponent />
        }
      </Tabs>

      {!loading && teams ? <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Task's name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Area</FormLabel>
              <Input placeholder="Task's area" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Team</FormLabel>
              <Select placeholder="Choose Team" borderColor={"gray.400"}>
                {
                  teams.map((team) => {
                    return (
                      <option value={team.id} key={team.id}>{team.attributes.name}</option>
                    )
                  })
                }
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date Limit</FormLabel>
              <Input placeholder="Task's date limit" type="datetime-local" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant={'solid'} colorScheme="blue" type='submit'>Save</Button>
            <Button variant={'ghost'} colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> : null
      }
    </Base>
  );
}
export default Calendar;
