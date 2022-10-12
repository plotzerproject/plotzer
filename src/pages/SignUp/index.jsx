//todo: validate data

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
import {  useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useQuery } from '../../hooks/useQuery'
import ErrorMessage from '../../components/ErrorMessage'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const { SignUp, loading } = useAuth()

    const navigate = useNavigate();

    const plan = useQuery("plan")

    async function handleCreateAccount(e) {
        e.preventDefault()
        if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                setError("")
                try {
                    await SignUp(name, email, password, plan)
                } catch (error) {
                    setError(error.message)
                }
                navigate("/signed", { replace: true });
            } else {
                setError("A senha esta diferente da confirmação")
            }
        } else {
            setError("Campos vazios")
        }
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
                    {
                        error && <ErrorMessage message={error} />
                    }
                    <form onSubmit={handleCreateAccount}>
                        <FormControl isRequired>
                            <FormLabel>Nome</FormLabel>
                            <Input type='text' size='md' placeholder='Insira seu nome' width="288px" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl mt={'2'} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='Insira seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl mt={'2'} isRequired>
                            <FormLabel>Senha</FormLabel>
                            <Input type='password' placeholder='Insira uma senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <FormControl mt={'2'} isRequired>
                            <FormLabel>Confirmação de senha</FormLabel>
                            <Input type='password' placeholder='Confirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>
                        <Button colorScheme='teal' variant='solid' marginTop='20px' type='submit' isLoading={loading} loadingText="Cadastrando">Cadastrar</Button>
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