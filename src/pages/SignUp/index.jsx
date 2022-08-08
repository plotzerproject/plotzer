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
import {useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate();

    function handleCreateAccount() {
        //cadastrar e talz
        navigate("/signed", { replace: true });

    }

    return (
        <Flex align='center' justifyContent='center'>
            <Container maxW="640px" centerContent bgColor={'white'} p={10} borderRadius={'8px'}>
                <Image src={Logo} alt='Logo Plotzer' />
                <VStack
                    // divider={}
                    spacing={3}
                >
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
                    <Button colorScheme='teal' variant='solid' onClick={handleCreateAccount}>Cadastrar</Button>
                    <Center height='20px' w="100%">
                        <Divider orientation='horizontal' borderColor='gray.300'/>
                        <Text>ou</Text>
                        <Divider orientation='horizontal' borderColor='gray.300'/>
                    </Center>
                    <Button leftIcon={<Icon as={FaGoogle} />} colorScheme='teal' variant='solid'><Divider orientation='vertical' borderColor='gray.300' h={'60%'} p={1} />Cadastrar com Google</Button>
                </VStack>
            </Container>
        </Flex>
    )
}
export default SignUp