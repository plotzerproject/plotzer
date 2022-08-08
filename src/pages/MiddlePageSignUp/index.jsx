import { Button, Container, Flex, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react"

import TeamImg from '../../assets/team_img_middlepage.png'
import Logo from '../../assets/logo_type.svg'

function MiddlePageSignUp() {
    return (
        <Container maxW={"1024px"}>
            <Flex align={"center"} justifyContent="space-between" color="white">
                <VStack align={"left"} maxW="400px">
                    <Image src={Logo} />
                    <Spacer />
                    <Heading as="h1" size="lg" fontWeight="bold">Bem vindo ao Plotzer</Heading>
                    <Text fontSize="lg">Você se tornou um novo usuário do Plotzer. Escolha se deseja criar uma equipe ou entrar em alguma já existente.</Text>
                    <VStack align={'left'}>
                        <HStack>
                            <Button size="md" colorScheme='teal' w="100%">Criar uma equipe</Button>
                            <Button size="md" colorScheme='teal' w="100%">Entrar em uma equipe</Button>
                        </HStack>
                        <Button size="md" colorScheme='teal'>Pular Esta Etapa</Button>
                    </VStack>
                </VStack>
                <Image src={TeamImg} />
            </Flex>
        </Container>
    )
}

export default MiddlePageSignUp