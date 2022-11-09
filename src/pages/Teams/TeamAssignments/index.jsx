import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentAdm from "../../../components/Assignment/AssigmentSingleAdm";
import Base from "../../../components/Base";
import { api } from "../../../services/api";
import Loading from "../../Loading";
import { AsyncSelect, chakraComponents } from "chakra-react-select";


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
    const [assignmentMembers, setAssignmentMembers] = useState("")
    const [assignmentDateLimit, setAssignmentDateLimit] = useState("")
    const [userAttachments, setUserAttachments] = useState([])

    async function getAssignments() {
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

    async function getTeamMembers() {
        try {
            const req = await api.get(`/team/${id_team}/members`)
            // req.data.data.
            const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
            const members = req.data.data.attributes.members.map((member) => {
                const colorIndex = Math.random() * (colorArray.length);
                const color = colorArray[colorIndex]
                return {
                    ...member,
                    label: member.email,
                    value: member.id,
                    colorScheme: color
                }
            })
            setTeamMembers(members)
            console.log(members)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleOpenCreateAssignment() {
        await getTeamMembers()
        onOpen()
    }

    async function onCloseAdd() {
        setTeamMembers([])
        onClose()
    }

    async function handleCreateAssignment(e){
        e.preventDefault()
        if(assignmentTitle !== "" && assignmentCategory !== "" && assignmentDescription !== "" && assignmentMembers !== "" && assignmentDateLimit !== ""){
            const date = new Date()
            const dateLimitUTF = new Date(assignmentDateLimit)
            if(dateLimitUTF > date){
                const formData = new FormData()
                const members = assignmentMembers.map((member)=>{
                    formData.append("users", member.id)
                    return member.id
                })
    
                formData.append("title", assignmentTitle)
                formData.append("id_team", id_team)
                formData.append("dateLimit", assignmentDateLimit)
                
                formData.append("description", assignmentDescription)
                formData.append("category", assignmentCategory)
    
                //add files
                const files = [...userAttachments]
                files.forEach((file)=>{
                    formData.append("assignmentAttachments", file)
                })

                console.log(files)
    
                const request = await api.post(`/assignment`, formData, {headers: { 'content-type': 'multipart/form-data'}})
                console.log(request)

                setAssignmentCategory("")
                setAssignmentDateLimit("")
                setAssignmentDescription("")
                setAssignmentMembers([])
                setAssignmentTitle("")
                setTeamMembers([])
                await getAssignments()
                console.log("teste")
            } else {
                alert("Coloque uma data maior!")
            }
        } else {
            alert("campos vazios")
        }
    }

    useEffect(() => {
        async function exec() {
            await getAssignments()
            await getTeam()
            setLoading(false)
        }
        exec()
    }, [])

    const asyncComponents = {
        LoadingIndicator: (props) => {
            const { color, emptyColor } = useColorModeValue(
                {
                    color: "blue.500",
                    emptyColor: "blue.100"
                },
                {
                    color: "blue.300",
                    emptyColor: "blue.900"
                }
            );

            return (
                <chakraComponents.LoadingIndicator
                    color={color}
                    emptyColor={emptyColor}
                    speed="750ms"
                    spinnerSize="md"
                    thickness="3px"
                    {...props}
                />
            );
        }
    };

    if (loading && Object.keys(team) !== 0) {
        return <Loading />
    } else {
        return <Base title={`Tarefas de "${team.attributes.name}"` || "Teste"}>
            <Flex flexDir={'column'} w='100%' h="100%">
                <HStack justify={'space-between'} mb='32px'>
                    <Heading>Tarefas</Heading>
                    <Button textColor={"white"} onClick={handleOpenCreateAssignment}>
                        Adicionar
                    </Button>
                </HStack>
                <Flex flexDir={'column'} w="100%" h="100%">
                    {assignments.map((assignment, key) => {
                        return <AssignmentAdm data={assignment} key={assignment.id} />
                    })}
                </Flex>
            </Flex>
            {teamMembers && teamMembers.length !== 0 ? <Modal isCentered isOpen={isOpen} onClose={onCloseAdd}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleCreateAssignment}>
                        <ModalHeader>Criar uma tarefa</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Título</FormLabel>
                                <Input
                                    placeholder="Título da tarefa"
                                    value={assignmentTitle}
                                    onChange={(e) => setAssignmentTitle(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Descrição</FormLabel>
                                <Textarea 
                                    placeholder="Descrição da tarefa"
                                    value={assignmentDescription}
                                    onChange={(e) => setAssignmentDescription(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Categoria</FormLabel>
                                <Input
                                    placeholder="Categoria da tarefa"
                                    value={assignmentCategory}
                                    onChange={(e) => setAssignmentCategory(e.target.value)}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Data Limite</FormLabel>
                                <Input placeholder="Task's date limit" type="datetime-local" value={assignmentDateLimit} onChange={(e)=>setAssignmentDateLimit(e.target.value)} />
                            </FormControl>
                            <FormControl>
                            <FormLabel>Membros</FormLabel>
                            <AsyncSelect
                                isMulti
                                name="colors"
                                placeholder="Selecione alguns usuarios"
                                components={asyncComponents}
                                onChange={setAssignmentMembers}
                                value={assignmentMembers}
                                loadOptions={(inputValue, callback) => {
                                    setTimeout(() => {
                                        const values = teamMembers.filter((member) =>
                                            member.label.toLowerCase().includes(inputValue.toLowerCase())
                                        );
                                        callback(values);
                                    }, 1000);
                                }}
                            />
                        </FormControl>
                        <FormControl mt={1} isRequired>
                                        <FormLabel>Anexos</FormLabel>
                                        <Input
                                            type={'file'}
                                            onChange={(e) => setUserAttachments(e.target.files)}
                                            multiple
                                        // value={title}
                                        // onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant={'solid'} colorScheme="blue" type='submit'>Save</Button>
                            <Button variant={'ghost'} colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal> : null}
        </Base>
    }
}

export default TeamAssignments