import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import Loading from "../Loading";
import Base from "../../components/Base";
import { Button, Divider, Flex, Heading, HStack, IconButton, Tag, Text, useDisclosure, VStack, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, ButtonGroup } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

function AssignmentSingle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [assignment, setAssignment] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    const [userAttachments, setUserAttachments] = useState([])

    const { id_assignment } = useParams();

    async function getAssignment() {
        try {
            const req = await api.get(`/assignment/${id_assignment}`);
            setAssignment(req.data.data)
        } catch (err) {
            console.log(err)

            //fazer o erro se não tiver permissão prra isso

            if (error.response.data.errors[0].title !== "ERR_ASSIGNMENT_NOT_FOUND") {
                setError(error.response.data.errors[0])
            }
        }
    }

    async function handleEditAttachments(e){
        e.preventDefault()
        onClose()
    }

    async function handleCompleteAttachments(e){
        e.preventDefault()

        try {
            const data = new FormData()
            const files = [...userAttachments]
            files.forEach((file)=>{
                data.append("userAttachments", file)
            })
            
            await api.post(`/assignment/@me/complete-assignment/${id_assignment}`, 
            data,
            {headers: { 'content-type': 'multipart/form-data'}})

            setUserAttachments([])
            getAssignment()

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function exec() {
            await getAssignment()
            setLoading(false)
        }
        exec()
    }, [])

    if (loading) {
        return <Loading />;
    } else if (!loading && error.title === "ERR_ASSIGNMENT_NOT_FOUND") {
        return <Base title={"Tarefas"}>
            Não encontrado
        </Base>
    } else if (!loading && error.title === "ERR_USER_PERMISSIONS") {
        return <Base title={"Tarefas"}>
            Sem Permissão
        </Base>
    } else {
        const dateLimit = new Date(assignment.attributes.dateLimit)
        return <Base title={assignment.attributes.title}>
            <Flex w="100%" h="100%" justify={'space-between'} p="20px">
                <Flex w="65%" h="100%" flexDir='column' justify={'space-between'} pr="20px">
                    <VStack h="50%" justify='flex-start'>
                        <Heading w="100%">{assignment.attributes.title}</Heading>
                        <HStack w="100%">
                            <Tag size={'lg'} variant='solid' colorScheme='teal'>
                                {assignment.attributes.category}
                            </Tag>
                            <Text>- {dateLimit.getDate()}/{dateLimit.getMonth() + 1}/{dateLimit.getFullYear()}
                            </Text>
                        </HStack>
                        <Text w="100%">{assignment.attributes.description}</Text>
                        <HStack w="100%">
                            <Button textColor={"white"} onClick={() => handleCompleteAttachments}>
                                Completar
                            </Button>
                        </HStack>

                    </VStack>
                    <VStack h="50%" w="100%" border={'1px'} borderColor='gray.400' p="15px" borderRadius={'8px'}>
                        <Heading w="100%" fontSize={'2xl'}>Arquivos Anexados</Heading>
                        <Divider w="100%" margin={'0 auto'} />
                        <VStack>
                            {
                                assignment && assignment.attributes.assignmentAttachments.length !== 0 ? assignment.attributes.assignmentAttachments.map((attachment) => {
                                    return <Flex w="100%" p="20px" bgColor={'gray.300'} onClick={() => { alert("como alterar a pag?") }} cursor='pointer' key={attachment.id}>
                                        <Heading fontSize={'md'}>{attachment.name}</Heading>
                                    </Flex>
                                }) : <Text>Nenhum arquivo anexado!</Text>
                            }
                        </VStack>
                    </VStack>
                </Flex>
                <Flex w="35%" h="100%" flexDir={'column'} justify={'space-between'}>
                    <VStack h="100%" w="100%" border={'1px'} borderColor='gray.400' p="15px" borderRadius={'8px'}>
                        <HStack w="100%" justify={'space-between'}>
                            <Heading fontSize={'2xl'}>Anexos do Usuário</Heading>
                            <IconButton
                                aria-label="Editar Anexos"
                                fontSize="24px"
                                // color="white"
                                variant={'outline'}
                                onClick={onOpen}
                                icon={<FaEdit />}
                            />
                        </HStack>
                        <Divider w="100%" margin={'0 auto'} />
                        <VStack >
                            asd
                        </VStack>
                    </VStack>
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <form onSubmit={handleEditAttachments}>
                                <ModalHeader>Adicionar Anexos</ModalHeader>
                                <Divider w="100%" />
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl mt={1} isRequired>
                                        <FormLabel>Photo</FormLabel>
                                        <Input
                                            type={'file'}
                                            onChange={(e) => setUserAttachments(e.target.files)}
                                            multiple
                                        // value={title}
                                        // onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter justifyContent={'space-between'}>
                                    <ButtonGroup>
                                        <Button variant={'solid'} colorScheme="blue" type='submit'>Save</Button>
                                        <Button variant={'ghost'} colorScheme="blue" mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                    </ButtonGroup>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
            </Flex>
        </Base>
    }
}

export default AssignmentSingle;
