import {
    Container,
    Image,
    FormControl,
    FormLabel,
    InputRightElement,
    InputGroup,
    InputLeftElement,
    // FormErrorMessage,
    Input,
    VStack,
    Button,
    Divider,
    Text,
    Center,
    Icon,
    Flex,
    ButtonGroup,
} from '@chakra-ui/react'

import { FaGoogle, FaEyeSlash, FaEye, FaUserAlt } from 'react-icons/fa'
import { LockIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo_type.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react'
import ErrorMessage from '../../components/ErrorMessage'

// import { ToastContainer, toast } from 'react-toastify';


function LogIn() {

    const { Login, loading, authenticated } = useAuth()
    const navigate = useNavigate();

    const [error, setError] = useState("")

    // useEffect(()=>{
    //     if(authenticated) {
    //         navigate("/dashboard")
    //     }
    // }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => setShowPassword(!showPassword)

    async function handleLogIn(e) {
        e.preventDefault()
        //cadastrar e talz
        //validar o email e senha com yup
        try {
            if (email !== "" && password !== "") {
                await Login(email, password)
                // navigate("/dashboard")
            } else {
                alert("Campos vazios")
            }
        } catch (err) {
            if(err.message === "ERR_USER_INCORRECT") {
                setError(err.message)
            } else {
                alert("Ocorreu um erro ao logar, tente novamente mais tarde!")
            }
        }

    }

    async function handleGoogleLogIn() {
        //login com o google

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
                        error && error === "ERR_USER_INCORRECT"? <ErrorMessage message={"E-mail ou senha incorretos!"}/> : null
                    }
                    <form onSubmit={handleLogIn}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <InputGroup >
                                <InputLeftElement children={<FaUserAlt />} />
                                <Input type='email' placeholder='Insira seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                        <FormControl mt="16px">
                            <FormLabel>Senha</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<LockIcon />} />
                                <Input type={showPassword ? 'text' : 'password'} placeholder='Insira uma senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick} variant="outline">
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <ButtonGroup>
                            <Button colorScheme='teal' variant='solid' onClick={()=>navigate("/")} marginTop='20px'>Voltar</Button>
                            <Button colorScheme='teal' variant='solid' type='submit' marginTop='20px' isLoading={loading} loadingText='Logando'>Logar</Button>
                        </ButtonGroup>
                    </form>
                    <Center height='20px' w="100%">
                        <Divider orientation='horizontal' borderColor='gray.300' />
                        <Text>ou</Text>
                        <Divider orientation='horizontal' borderColor='gray.300' />
                    </Center>
                    <Button leftIcon={<Icon as={FaGoogle} />} colorScheme='teal' variant='outline' onClick={handleGoogleLogIn}><Divider orientation='vertical' borderColor='gray.300' h={'30%'} p={1} />Logar com Google</Button>
                </VStack>
            </Container>
        </Flex>
    )
}
export default LogIn