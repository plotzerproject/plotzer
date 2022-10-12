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
} from "@chakra-ui/react";
import Assignment from "../../components/Assignment";
import Base from "../../components/Base";
import assigments from "../../utils/assigments";

function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {assigments.map((item, indice) => {
              if (item.finished === false) {
                return <Assignment data={item} key={indice} />;
              }
            })}
          </TabPanel>
          <TabPanel>
          {assigments.map((item, indice) => {
              if (item.finished === true) {
                return <Assignment data={item} key={indice} />;
              }
            })}
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
export default Calendar;
