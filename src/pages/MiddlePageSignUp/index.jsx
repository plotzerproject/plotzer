import { Button, Container, Flex, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react"

import TeamImg from '../../assets/team_img_middlepage.png'
import Logo from '../../assets/logo_type.svg'
import {useNavigate } from 'react-router-dom'

function MiddlePageSignUp() {
    const navigate = useNavigate();

    function handleCreateTeam() {
        navigate("/start/createteam", {replace: false})
    }
    
    function handleJoinTeam() {
        navigate("/start/jointeam", {replace: false})
        
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
                        <Heading as="h1" size="lg" fontWeight="bold">Bem vindo ao Plotzer</Heading>
                        <Text fontSize="lg">Você se tornou um novo usuário do Plotzer. Escolha se deseja criar uma equipe ou entrar em alguma já existente.</Text>
                        <VStack align={'left'}>
                            <HStack>
                                <Button size="md" colorScheme='teal' w="100%" onClick={handleCreateTeam}>Criar uma equipe</Button>
                                <Button size="md" colorScheme='teal' w="100%" onClick={handleJoinTeam}>Entrar em uma equipe</Button>
                            </HStack>
                            <Button size="md" colorScheme='teal' onClick={handleSkip}>Pular Esta Etapa</Button>
                        </VStack>
                    </VStack>
                    <Image src={TeamImg} />
                </Flex>
            </Container>
        </Flex>
    )
}

export default MiddlePageSignUp