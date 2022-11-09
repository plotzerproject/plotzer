import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentAdm from "../../../components/Assignment/AssigmentSingleAdm";
import Base from "../../../components/Base";
import { api } from "../../../services/api";
import Loading from "../../Loading";

function TeamAssignments() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})
    const [assignments, setAssignments] = useState([])
    const [team, setTeam] = useState({})
    const { id_team } = useParams();

    const [teamMembers, setTeamMembers] = useState([])

    const [assignmentTitle, setAssignmentTitle] = useState("")
    const [assignmentDescription, setAssignmentDescription] = useState("")
    const [assignmentCategory, setAssignmentCategory] = useState("")

    async function getMyAssignments() {
        try {
            const req = await api.get(`/assignment/get/${id_team}`);
            setAssignments(req.data.data)
        } catch (err) {
            console.log(err)

            //fazer o erro se não tiver permissão prra isso

            //   if (error.response.data.errors[0].title !== "ERR_ASSIGNMENT_NOT_FOUND") {
            //     setError(error.response.data.errors[0])
            //   }
        }
    }

    async function getTeam() {
        try {
            const req = await api.get(`/team/${id_team}`);
            setTeam(req.data.data)
        } catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {
        async function exec() {
            await getMyAssignments()
            await getTeam()
            setLoading(false)
        }
        exec()
    }, [])

    if (loading && Object.keys(team) !== 0) {
        return <Loading />
    } else {
        return <Base title={`Tarefas de "${team.attributes.name}"` || "Teste"}>
            <Flex flexDir={'column'} w='100%' h="100%">
                <HStack justify={'space-between'} mb='32px'>
                    <Heading>Tarefas</Heading>
                    <Button textColor={"white"} onClick={onOpen}>
                        Adicionar
                    </Button>
                </HStack>
                <Flex flexDir={'column'} w="100%" h="100%">
                    {assignments.map((assignment, key) => {
                        return <AssignmentAdm data={assignment} key={assignment.id} />
                    })}
                </Flex>
            </Flex>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form>
                    <ModalHeader>Criar uma tarefa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Título</FormLabel>
                            <Input 
                            placeholder="Título da tarefa"
                            value={assignmentTitle}
                            onChange={(e)=>setAssignmentTitle(e.target.value)}
                             />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Descrição</FormLabel>
                            <Input 
                            placeholder="Descrição da tarefa"
                            value={assignmentDescription}
                            onChange={(e)=>setAssignmentDescription(e.target.value)}
                             />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            <Input 
                            placeholder="Categoria da tarefa"
                            value={assignmentCategory}
                            onChange={(e)=>setAssignmentCategory(e.target.value)}
                             />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Data Limite</FormLabel>
                            <Input placeholder="Task's date limit" type="datetime-local" />
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Membros</FormLabel>
                            <Input 
                            placeholder="Título da tarefa"
                            value={assignmentTitle}
                            onChange={(e)=>setAssignmentTitle(e.target.value)}
                             />
                        </FormControl> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant={'solid'} colorScheme="blue" type='submit'>Save</Button>
                        <Button variant={'ghost'} colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Base>
    }
}

export default TeamAssignments