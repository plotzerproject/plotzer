import {
    Container,
    Image,
    FormControl,
    FormLabel,
    // FormErrorMessage,
    Input,
    VStack,
    Button,
    Divider,
    Text,
    Center,
    Icon,
    Flex,
} from '@chakra-ui/react'

import { FaGoogle } from 'react-icons/fa'
import Logo from '../../assets/logo_type.svg'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate();

    function handleCreateAccount() {
        //cadastrar e talz
        navigate("/signed", { replace: true });

    }

    function handleGoogleSignUp() {
        navigate("/signed", { replace: true });
        
    }

    return (
        <Flex align='center' justifyContent='center' w="100vw" h="100vh" bgColor={'blue.400'}>
            <Container maxW="container.sm" centerContent bgColor={'white'} p={10} borderRadius={'8px'}>
                <VStack
                    // divider={}
                    spacing={3}
                >
                <Image src={Logo} alt='Logo Plotzer' />
                    <form>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input type='text' size='md' placeholder='Insira seu nome' width="288px" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='Insira seu e-mail' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha</FormLabel>
                            <Input type='password' placeholder='Insira uma senha' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirmação de senha</FormLabel>
                            <Input type='password' placeholder='Confirme sua senha' />
                        </FormControl>
                        <Button colorScheme='teal' variant='solid' onClick={handleCreateAccount} marginTop='20px'>Cadastrar</Button>
                    </form>
                    <Center height='20px' w="100%">
                        <Divider orientation='horizontal' borderColor='gray.300' />
                        <Text>ou</Text>
                        <Divider orientation='horizontal' borderColor='gray.300' />
                    </Center>
                    <Button leftIcon={<Icon as={FaGoogle} />} colorScheme='teal' variant='solid' onClick={handleGoogleSignUp}><Divider orientation='vertical' borderColor='gray.300' h={'60%'} p={1} />Cadastrar com Google</Button>
                </VStack>
            </Container>
        </Flex>
    )
}
export default SignUp