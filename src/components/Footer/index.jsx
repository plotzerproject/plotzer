import { Flex, Text } from "@chakra-ui/react"

function Footer() {
    return <Flex bgColor={'gray.100'} w="100%" justifyContent={'space-between'} h="70px" alignItems={'center'} p="0 40px">
        <Text fontSize={'sm'} lineHeight='5' color={'gray.500'}>&copy; 2022 Plotzer. Todos os direitos reservados.</Text>
        <Text fontSize={'sm'} lineHeight='5' color={'gray.500'}>Desenvolvido com ♥ por alunos da ETEC Bento Quirino</Text>
    </Flex>
}

export default Footer