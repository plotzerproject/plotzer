import { Button, Flex, HStack, Select, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, ButtonGroup, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import Base from '../../components/Base'
import ErrorMessage from '../../components/ErrorMessage';
import KanbanCard from '../../components/KanbanCard';
import { api } from '../../services/api';
import Loading from '../Loading';

function Methodologies() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [color, setColor] = useState("ffffff");

    async function getMyCards() {
        setLoading(true);
        try {
            const req = await api.get(`/kanban/@me/`);
            setCards(req.data.data)
        } catch (error) {
            console.log(error)
            if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
                setError({
                    title: "Assignment",
                    subtitle: error.response.data.errors[0].title,
                    detail: error.response.data.errors[0].detail
                })
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        async function exec(){
        getMyCards()
        }
        exec()
    }, [])

    async function createCard(e) {
        e.preventDefault()

        if(title === "" || subtitle === "") {
            setError({
                title: "Kanban",
                subtitle: "Invalid Data",
                detail: "You must put all the data",
                category: 'create'
            })
            return;
        }

        try {
            const data = {
                title,
                subtitle,
                color
            }
            await api.post("/kanban", data)
            onClose()
            setTitle("")
            setColor("#ffffff")
            setSubtitle("")
            getMyCards()
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <Base padding={"0"} direction="column">
                <HStack justifyContent={'space-between'} w="100%" h="60px" bgColor={'gray.200'} p="10px 20px">
                    <Select placeholder="Select Methodology" borderColor={"gray.400"} w="auto" onChange={()=>alert("Next Updates")}>
                        <option value="kanban">Kanban</option>
                    </Select>
                    <Button colorScheme="teal" onClick={onOpen}>Create Card</Button>
                </HStack>
                <Flex w="100%" h="100%" p="40px" flexWrap={'nowrap'} overflowX='scroll'>
                    {
                        cards && cards.map((card, key)=>{
                            return <KanbanCard card={card} key={key} getCards={()=>{getMyCards()}}/>
                        })
                    }
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={createCard}>
                            <ModalHeader>Create Card</ModalHeader>
                            <Divider w="100%" />
                            <ModalCloseButton />
                            <ModalBody>
                                {
                                    error && error.category === "create" ? <ErrorMessage message={error.detail}/>: <></>
                                }
                                <FormControl mt={1} isRequired>
                                    <FormLabel>Title</FormLabel>
                                        <Input
                                            placeholder="Create Topic"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                </FormControl>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Subtitle</FormLabel>
                                        <Input
                                            placeholder="Create Topic"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                        />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Color</FormLabel>
                                        <Input
                                            placeholder="Create Topic"
                                            value={color}
                                            onChange={(e) => {setColor(e.target.value); console.log(e.target.value)}}
                                            type='color'
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
            </Base>
        )
    }
}

export default Methodologies