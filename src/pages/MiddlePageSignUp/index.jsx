import { Button, Container, Flex, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react"

import TeamImg from '../../assets/team_img_middlepage.png'
import Logo from '../../assets/logo_type.svg'
import {useNavigate } from 'react-router-dom'

function MiddlePageSignUp() {
    const navigate = useNavigate();

    function handleCreateTeam() {
        alert("Ocorreram erros ao desenvolver esta funcionalidade")
        navigate("/dashboard")
        // navigate("/start/createteam", {replace: false})
    }
    
    function handleJoinTeam() {
        alert("Ocorreram erros ao desenvolver esta funcionalidade")
        navigate("/dashboard")
        // navigate("/start/jointeam", {replace: false})
        
    }
    
    function handleSkip() {
        navigate("/dashboard", {replace: false})

    }

    return (
        <Flex w="100vw" h="100vh" alignItems={'center'} justifyContent='center' bgColor={'blue.400'}>
            <Container maxW={"container.lg"} >
                <Flex align={"center"} justifyContent="space-between" color="white">
                    <VStack align={"left"} maxW="400px">
                        <Image src={Logo} />
                        <Spacer />
                        <Heading as="h1" size="lg" fontWeight="bold">Welcome to Plotzer</Heading>
                        <Text fontSize="lg">You've become a new Plotzer user. Choose whether to create a team or join an existing one.</Text>
                        <VStack align={'left'}>
                            <HStack>
                                <Button size="md" colorScheme='teal' w="100%" onClick={handleCreateTeam}>Create a team</Button>
                                <Button size="md" colorScheme='teal' w="100%" onClick={handleJoinTeam}>Join a team</Button>
                            </HStack>
                            <Button size="md" colorScheme='teal' onClick={handleSkip}>Skip this step</Button>
                        </VStack>
                    </VStack>
                    <Image src={TeamImg} />
                </Flex>
            </Container>
        </Flex>
    )
}

export default MiddlePageSignUp