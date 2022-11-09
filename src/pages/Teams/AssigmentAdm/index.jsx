import { Avatar, Divider, Flex, Heading, HStack, IconButton, Tag, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Base from "../../../components/Base";
import { api } from "../../../services/api";
import Loading from "../../Loading";

function AssignmentAdm() {
    let navigate = useNavigate();
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})
    const [userSelected, setUserSelected] = useState({})
    const [assignment, setAssignment] = useState([])
    const [team, setTeam] = useState({})
    const { id_team, id_assignment } = useParams();
    async function getAssignment() {
        try {
            const req = await api.get(`/assignment/${id_assignment}?users=populate`);
            setAssignment(req.data.data)
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
            await getAssignment()
            await getTeam()
            setLoading(false)
        }
        exec()
    }, [])

    if (loading && Object.keys(team) !== 0 && Object.keys(assignment)) {
        return <Loading />
    } else {
        const dateLimit = new Date(assignment.attributes.assignment.dateLimit)
        return <Base title={`Tarefas de "${team.attributes.name}"` || "Teste"}>
            <Flex w="100%" h="100%" justify={'space-between'} p="20px">
                <Flex w="65%" h="100%" flexDir='column' justify={'space-between'} pr="20px">
                    <VStack h="50%" justify='flex-start'>
                        <Heading w="100%">{assignment.attributes.assignment.title}</Heading>
                        <HStack w="100%">
                            <Tag size={'lg'} variant='solid' colorScheme='teal'>
                                {assignment.attributes.assignment.category}
                            </Tag>
                            <Text>- {dateLimit.getDate()}/{dateLimit.getMonth() + 1}/{dateLimit.getFullYear()}
                            </Text>
                        </HStack>
                        <Text w="100%">{assignment.attributes.assignment.description}</Text>
                        {/* <Divider w="30%" margin={'0 auto'} /> */}

                    </VStack>
                    <VStack h="50%" w="100%" border={'1px'} borderColor='gray.400' p="15px" borderRadius={'8px'}>
                        <HStack justify={'space-between'} w="100%">
                            <Heading fontSize={'2xl'}>Arquivos Anexados</Heading>
                            <IconButton
                                aria-label="Editar Anexos"
                                fontSize="24px"
                                variant="ghost"
                                onClick={() => {
                                    alert("depois")
                                }}
                                icon={<FaEdit />}
                            />
                        </HStack>

                        <Divider w="100%" margin={'0 auto'} />
                        <VStack>
                            {
                                assignment && assignment.attributes.assignment.assignmentAttachments.length !== 0 ? assignment.attributes.assignment.assignmentAttachments.map((attachment) => {
                                    return <Flex w="100%" p="20px" bgColor={'gray.300'} onClick={() => { alert("como alterar a pag?") }} cursor='pointer' key={attachment.id}>
                                        <Heading fontSize={'md'}>{attachment.name}</Heading>
                                    </Flex>
                                }) : <Text>Nenhum arquivo anexado!</Text>
                            }
                        </VStack>
                    </VStack>
                </Flex>
                <Flex w="35%" h="100%" flexDir={'column'} justify={'space-between'}>
                    <Flex w="100%" h="50%" justify='flex-start' paddingBottom={'16px'}>
                        <Flex w="100%" h="100%" bgColor={'gray.100'} borderRadius='8px' flexDir={'column'} >
                            <HStack w="100%" p="16px">
                                <Heading color={'gray.800'} fontSize='lg'>
                                    Usuários
                                </Heading>
                            </HStack>
                            <Divider w="100%" borderColor={'gray.400'} />
                            <VStack w="100%" h="100%" overflowY={'scroll'} p="16px">
                                {
                                    assignment.attributes.users.length !== 0 ? assignment.attributes.users.map((user) => {
                                        return <HStack h="60px" bgColor={'gray.300'} w="100%" onClick={() => setUserSelected(user)} cursor='pointer' p="6px 20px" borderRadius={'12px'} m="8px 0">
                                            <Avatar
                                                size='md'
                                                name={user.user.name}
                                                src={user.user.photo ? user.user.photo : ""}
                                            />
                                            <Heading fontSize={'md'}>{user.user.name}</Heading>
                                        </HStack>
                                    }) : null
                                }
                            </VStack>
                        </Flex>
                    </Flex>
                    <VStack h="50%" w="100%" border={'1px'} borderColor='gray.400' p="15px" borderRadius={'8px'}>
                        <Heading w="100%" fontSize={'2xl'}>Anexos do Usuário</Heading>
                        <Divider w="100%" margin={'0 auto'} />
                        <VStack >
                            {Object.keys(userSelected).length !== 0 ?
                                userSelected.userAttachments.length !== 0 ? userSelected.userAttachments.map((attachment, key) => {
                                    return <h1 key={key}>teste</h1>
                                }) : <Text>Nenhum arquivo anexado!</Text>
                                : <Text>Selecione um usuário</Text>}
                        </VStack>
                    </VStack>
                </Flex>
            </Flex>
        </Base>
    }
}

export default AssignmentAdm