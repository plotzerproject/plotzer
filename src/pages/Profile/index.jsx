import { Avatar, Box, Button, ButtonGroup, Divider, Flex, FormControl, FormLabel, Heading, Highlight, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaCamera } from 'react-icons/fa'
import Base from '../../components/Base'
import { api } from '../../services/api'
import Loading from '../Loading'

function Profile() {
    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function handleAddPhoto(){

    }

    useEffect(() => {
        async function getUser() {
            try {
                const req = await api.get("/user/@me")
                setUser(req.data.data)
                setLoading(false)
            } catch (error) {
                setError({
                    title: "User",
                    subtitle: error.response.data.errors[0].title,
                    detail: error.response.data.errors[0].detail
                })
                setLoading(false)
            }
        }
        getUser()
    }, [])

    if (loading) {
        return <Loading />
    } else {
        return (
            <Base padding={'0'}>
                <VStack p={'30px 0'} boxShadow='md' h="100%" backgroundColor={'gray.50'} maxW="1024px" w="100%" margin={'0 auto'}>
                    <Flex flexDir={'column'} pos='relative' mb={'15px'} boxShadow='base' borderRadius={'8px'} backgroundColor={'gray.200'}>
                        {
                            user.attributes.background ? <Box maxW="1024px" w="1024px" h="200px" backgroundImage={user.attributes.background} backgroundPosition='cover' backgroundRepeat={'no-repeat'} />
                            : <Box maxW="1024px" w="1024px" h="200px" backgroundColor={'gray.400'} onClick={()=>alert("next updates")}/>
                        }
                        
                        <HStack justifyContent={'flex-end'} padding='5px 30px 70px 30px'>
                            {
                                user.attributes.photo ? <Image
                                    borderRadius='full'
                                    boxSize='170px'
                                    src={user.attributes.photo}
                                    alt={`${user.attributes.name}'s profile photo`}
                                    pos='absolute'
                                    left="30px"
                                    top="40%"
                                /> : <Tooltip label="Add Photo" placement="bottom">
                                    <IconButton
                                        aria-label="Color Theme"
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
                                        onClick={onOpen}
                                    />
                                </Tooltip>
                            }
                            <HStack justifyContent={'space-between'} w="80%" justify={'flex-start'} lineHeight='1'>
                                <VStack textAlign={'left'}>
                                    <Heading w="100%" mb="0">{user.attributes.name}</Heading>
                                    <Text mt={'0'}>lorem ipsum do lor sit amet</Text>
                                </VStack>
                                <Button colorScheme="teal">Edit</Button>
                            </HStack>
                        </HStack>
                    </Flex>
                    <Flex maxW="1024px" w="1024px" backgroundColor={'gray.200'} flexDir='column' p="30px" boxShadow='base' borderRadius={'8px'}>
                        <Heading fontSize={'3xl'} lineHeight='7' fontWeight={'semibold'} mb='10px'>About</Heading>
                        {user.attributes.about ? <Text>{user.attributes.about}</Text> :
                            <Text>Seu perfil não possui um sobre, clique aqui para adicionar</Text>}
                    </Flex>
                </VStack>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleAddPhoto}>
                            <ModalHeader>Create Card</ModalHeader>
                            <Divider w="100%" />
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl mt={1} isRequired>
                                    <FormLabel>Photo</FormLabel>
                                        <Input
                                            placeholder="Create Topic"
                                            type={'file'}
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
    }
}

export default Profile