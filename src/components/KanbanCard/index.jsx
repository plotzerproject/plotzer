import { EditIcon, LinkIcon } from "@chakra-ui/icons"
import { Flex, Heading, HStack, VStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, ButtonGroup, IconButton, Tooltip, FormControl, FormLabel, Input, Editable, EditablePreview, EditableInput, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import { formatDate } from "../../utils/date"

function KanbanCard({ card, getCards }) {

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [topicSelected, setTopicSelected] = useState({})
    // const [cardSelected, setCardSelected] = useState({})
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    // useEffect(()=>{
    //     console.log(topic)
    // },[])

    async function editTopic(id) {
        setContent("")
        setTitle("")
        const c = card.attributes.topics.find((t) => t.id === id)
        setTopicSelected(c)
        setContent(c.content)
        setTitle(c.title)
        onOpen()
    }

    // async function editCard(id) {
    //     const c = card.attributes.topics.find((t) => t.id == id)
    //     setCardSelected(c)
    //     setTopic(c.content)
    //     onOpen()
    // }

    async function handleEditTopic(e) {
        e.preventDefault()

        try {
            const data = {
                title,
                content
            }
            await api.put(`/kanban/put/${card.id}/${topicSelected.id}`, data)
            getCards()

            setContent("")
            setTitle("")
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex minWidth={'300px'} maxW='350px' w="100%" bgColor={card.attributes.color ? card.attributes.color : 'gray.200'} flexDir='column' borderRadius='md' boxShadow={'md'} mr='20px'>
            <Tooltip label={card.attributes.subtitle} placement="top">
                <HStack p="15px 20px" bgColor={'gray.300'} w="100%" justifyContent={'space-between'}>
                    <Heading as={'h2'} fontSize='lg' fontWeight={'semibold'}>{card.attributes.title}</Heading>
                    {!card.attributes.isAssignment &&
                        <Tooltip label="Edit Topic" placement="right">
                            <IconButton
                                color={"white"}
                                variant="ghost"
                                aria-label="Edit Topic"
                                fontSize="24px"
                                onClick={() => alert("Next updates")}
                                icon={<EditIcon />}
                            />
                        </Tooltip>
                    }
                </HStack>
            </Tooltip>
            <VStack w="100%" p="10px">
                {
                    card.attributes.topics.map((c, key) => {
                        return <HStack key={c.id} w="100%" bgColor={c.color ? c.color : 'gray.300'} p="15px" fontSize={'lg'} borderRadius='md' justifyContent={'space-between'}>
                            <Text fontSize={'lg'} id={`topic-${c.id}`}>{c.title}</Text>
                            {
                                card.attributes.isAssignment ? <Tooltip label="Open Assignment" placement="right">
                                    <IconButton
                                        color={"white"}
                                        variant="ghost"
                                        aria-label="Open Assignment"
                                        fontSize="24px"
                                        onClick={() => navigate(`/assignment/${c.id}`)}
                                        icon={<LinkIcon />}
                                    />
                                </Tooltip> :
                                    <Tooltip label="Edit Topic" placement="right">
                                        <IconButton
                                            color={"white"}
                                            variant="ghost"
                                            aria-label="Edit Topic"
                                            fontSize="24px"
                                            onClick={() => editTopic(c.id)}
                                            icon={<EditIcon />}
                                        />
                                    </Tooltip>
                            }
                        </HStack>
                    })
                }
            </VStack>
            {
                topicSelected && <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleEditTopic}>
                            <ModalHeader>{title || topicSelected.title}: </ModalHeader>
                            <Divider w="100%" />
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl mt={4}>
                                    <FormLabel>Title</FormLabel>
                                    <Editable defaultValue={title}>
                                        <EditablePreview />
                                        <Input
                                            placeholder="Edit Topic"
                                            // value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            as={EditableInput}
                                        />
                                    </Editable>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Content</FormLabel>
                                    <Editable defaultValue={content || topicSelected.content}>
                                        <EditablePreview />
                                        <Input
                                            placeholder="Edit Topic"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            as={EditableInput}
                                        />
                                    </Editable>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter justifyContent={'space-between'}>
                                <span>{formatDate(topicSelected.updatedAt)}</span>
                                <ButtonGroup>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button variant={'ghost'} type='submit'>Edit</Button>
                                </ButtonGroup>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            }
        </Flex>
    )
}

export default KanbanCard