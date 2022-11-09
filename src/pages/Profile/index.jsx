import { Avatar, Box, Button, ButtonGroup, Divider, Flex, FormControl, FormLabel, Heading, Highlight, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Base from '../../components/Base'
import { api } from '../../services/api'
import Loading from '../Loading'

function Profile() {
    const { id_user } = useParams()

    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

    const [profilePhoto, setProfilePhoto] = useState("")

    const [typeUpdate, setTypeUpdate] = useState("")
    async function openUpdatePhoto(type) {
        setTypeUpdate(type)
        onOpen()
    }

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [about, setAbout] = useState("")
    const [description, setDescription] = useState("")

    async function handleEditUser(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("description", description)
            formData.append("about", about)
            await api.put(`/user/@me`, formData)
            alert("Atualizado 2!")
            getUser()
            setAbout("")
            setName("")
            setDescription("")
            setEmail("")
            onCloseEdit()

        } catch (err) {
            console.log(err)
        }
    }

    async function handleOpenEdit(){
        if(user.attributes.name) setName(user.attributes.name)
        if(user.attributes.email) setEmail(user.attributes.email)
        if(user.attributes.description) setDescription(user.attributes.description)
        if(user.attributes.about) setAbout(user.attributes.about)
        onOpenEdit()
    }

    async function handleUpdatePhoto(e) {
        e.preventDefault()
        const formData = new FormData()
        if (typeUpdate === "Background") {
            formData.append('background', profilePhoto)
        } else {
            formData.append('photo', profilePhoto)
        }
        try {
            await api.put(`/user/@me`, formData)
            alert("Atualizado!")
            getUser()
            setProfilePhoto("")
            onClose()
        } catch (err) {
            console.log(err)
        }
    }

    async function getUser() {
        try {
            if (id_user) {
                const req = await api.get(`/user/get/${id_user}?teams=true`)
                setUser(req.data.data)
            } else {
                const req = await api.get("/user/@me?teams=true")
                setUser(req.data.data)
            }
        } catch (err) {
            console.log(err)
            setError({
                title: "User",
                subtitle: error.response.data.errors[0].title,
                detail: error.response.data.errors[0].detail
            })
        }
    }

    useEffect(() => {
        getUser()
        setLoading(false)
    }, [])
    if (loading) {
        return <Loading />
    } else {
        if (Object.keys(error).length === 0 && Object.keys(user).length !== 0) {
            return (
                <Base padding={'0'} title={`${user.attributes.name}'s Profile`}>
                    <VStack p={'30px 0'} boxShadow='md' h="100%" backgroundColor={'gray.50'} maxW="1024px" w="100%" margin={'0 auto'}>
                        <Flex flexDir={'column'} pos='relative' mb={'15px'} boxShadow='base' borderRadius={'8px'} backgroundColor={'gray.200'}>
                            {
                                user.attributes.background ? <Tooltip label="Editar Background" placement="bottom">
                                    <Box maxW="1024px" w="1024px" h="200px" backgroundImage={user.attributes.background} backgroundPosition='center' backgroundRepeat={'no-repeat'} onClick={() => openUpdatePhoto('Background')} cursor='pointer' />
                                </Tooltip>
                                    : !id_user ? <Tooltip label="Adicionar Background" placement="bottom">
                                        <Box maxW="1024px" w="1024px" h="200px" backgroundColor={'gray.400'} onClick={() => openUpdatePhoto('Background')} cursor='pointer' />
                                    </Tooltip> : <Box maxW="1024px" w="1024px" h="200px" backgroundColor={'gray.400'} />
                            }

                            <HStack justifyContent={'flex-end'} padding='5px 30px 70px 30px'>
                                {
                                    user.attributes.photo ? <Tooltip label="Editar Foto" placement="bottom">
                                        <Image
                                            borderRadius='full'
                                            boxSize='170px'
                                            src={user.attributes.photo}
                                            alt={`${user.attributes.name}'s profile photo`}
                                            pos='absolute'
                                            left="30px"
                                            top="40%"
                                            onClick={() => openUpdatePhoto("Profile")}
                                            cursor='pointer'
                                        />
                                    </Tooltip> : !id_user ? <Tooltip label="Adicionar Foto" placement="bottom">
                                        <IconButton
                                            aria-label="Adicionar Foto"
                                            fontSize="48px"
                                            variant={'ghost'}
                                            color='white'
                                            icon={<FaCamera />}
                                            w="170px"
                                            h="170px"
                                            backgroundColor={'gray.500'}
                                            borderRadius='50%'
                                            pos={'absolute'}
                                            left="30px"
                                            top="40%"
                                            onClick={() => openUpdatePhoto("Profile")}
                                        />
                                    </Tooltip> : <Box
                                        w="170px"
                                        h="170px"
                                        backgroundColor={'gray.500'}
                                        borderRadius='50%'
                                        pos={'absolute'}
                                        left="30px"
                                        top="40%"
                                    />
                                }
                                <HStack justifyContent={'space-between'} w="80%" justify={'flex-start'} lineHeight='1'>
                                    <VStack textAlign={'left'}>
                                        <Heading w="100%" mb="0">{user.attributes.name}</Heading>
                                        <Text mt={'0'} w="100%">{user.attributes.about ? `${user.attributes.about}` : !id_user ? "Seu perfil não possui uma descrição, clique aqui para adicionar" :
                                            "Este perfil não possui uma descrição!"}</Text>
                                    </VStack>
                                    {!id_user && <Button colorScheme="teal" onClick={handleOpenEdit}>Edit</Button>}
                                </HStack>
                            </HStack>
                        </Flex>
                        <Flex maxW="1024px" w="1024px" backgroundColor={'gray.200'} flexDir='column' p="30px" boxShadow='base' borderRadius={'8px'}>
                            <Heading fontSize={'3xl'} lineHeight='7' fontWeight={'semibold'} mb='10px'>About</Heading>
                            {user.attributes.description ? <Text>{user.attributes.description}</Text> : !id_user ? <Text>Seu perfil não possui um sobre, clique aqui para adicionar</Text> :
                                <Text>Este perfil não possui um sobre!</Text>}
                        </Flex>

                        <Flex maxW="1024px" w="1024px" backgroundColor={'gray.200'} flexDir='column' p="30px" boxShadow='base' borderRadius={'8px'}>
                            <Heading fontSize={'3xl'} lineHeight='7' fontWeight={'semibold'} mb='10px'>Teams</Heading>
                            {user.attributes.teams.length !== 0 ? <Text>{user.attributes.name} faz parte de <strong>{user.attributes.teams.length} equipes</strong></Text> : <Text>{user.attributes.name} <strong>não faz parte de nenhuma equipe</strong></Text>}
                        </Flex>
                    </VStack>
                    <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <form onSubmit={handleEditUser}>
                                <ModalHeader>Editar Usuário</ModalHeader>
                                <Divider w="100%" />
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl mt={1} isRequired>
                                        <FormLabel>Nome</FormLabel>
                                        <Input
                                                placeholder="Insira seu nome"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                    </FormControl>
                                    <FormControl mt={1} isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                                placeholder="Insira seu e-mail"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                    </FormControl>
                                    <FormControl mt={1} isRequired>
                                        <FormLabel>Sobre</FormLabel>
                                        <Input
                                                placeholder="Insira um 'sobre'"
                                                value={about}
                                                onChange={(e) => setAbout(e.target.value)}
                                            />
                                    </FormControl>
                                    <FormControl mt={1} isRequired>
                                        <FormLabel>descrição</FormLabel>
                                        <Textarea
                                                placeholder="Insira uma descrição"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter justifyContent={'space-between'}>
                                    <ButtonGroup>
                                        <Button variant={'solid'} colorScheme="blue" type='submit'>Save</Button>
                                        <Button variant={'ghost'} colorScheme="blue" mr={3} onClick={onCloseEdit}>
                                            Close
                                        </Button>
                                    </ButtonGroup>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <form onSubmit={handleUpdatePhoto}>
                                <ModalHeader>Editar {typeUpdate} Image</ModalHeader>
                                <Divider w="100%" />
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl mt={1} isRequired>
                                        <FormLabel>Photo</FormLabel>
                                        <Input
                                            type={'file'}
                                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                                            accept={'image/*'}
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
                </Base>
            )
        } else {
            return <>deu erro</>
        }
    }
}

export default Profile