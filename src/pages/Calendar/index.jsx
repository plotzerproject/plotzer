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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Assignment from "../../components/Assignment";
import Base from "../../components/Base";
import { api } from "../../services/api";
// import assigments from "../../utils/assigments";
import Loading from "../Loading";

function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState({})
  const [assignments, setAssignments] = useState([])
  const [errorGetAssignment, setErrorGetAssignment] = useState({})

  useEffect(()=>{
    async function getMyAssignments() {
      setLoading(true);
      try {
        const req = await api.get("/assignment/@me/my-assignments/");
        setAssignments(req.data.data)
        console.log(req)
        setLoading(false)
      } catch (error) {
        console.log(error)
        if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
          setErrorGetAssignment({
            title: "Assignment",
            subtitle: error.response.data.errors[0].title,
            detail: error.response.data.errors[0].detail
          })
        }
      }
      setLoading(false);
    }

    getMyAssignments()
  }, [])

  if(loading) {
    return <Loading />
  } else {
    return (
    
      <Base>
        <Tabs w="100%">
          <TabList justifyContent={"space-between"}>
            <HStack>
              <Tab>Next</Tab>
              <Tab>Completed</Tab>
              <HStack gap={2}>
                <Select placeholder="Filtrar por equipe" borderColor={"gray.400"}>
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
  
          <TabPanels>
            <TabPanel>
              {
                errorGetAssignment && errorGetAssignment.subtitle === "ERR_ASSIGNMENT_NOT_FOUND" ? 
                <Heading>{errorGetAssignment.detail}</Heading> : 
                assignments.map((item, indice)=>{
                  if(item.attributes.status == "received") {
                    return <Assignment data={item} key={item.id} />
                  }
                })
              }
            </TabPanel>
            <TabPanel>
            {
                errorGetAssignment && errorGetAssignment.subtitle === "ERR_ASSIGNMENT_NOT_FOUND" ? 
                <Heading>{errorGetAssignment.detail}</Heading> : 
                assignments.map((item, indice)=>{
                  if(item.attributes.status == "sent" || item.attributes.status == "returned") {
                    return <Assignment data={item} key={item.id} />
                  }
                })
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
  
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
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
                <FormLabel>Limit</FormLabel>
                <Input placeholder="Task's date limit" type="datetime-local" />
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
      </Base>
    );
  }
}
export default Calendar;
