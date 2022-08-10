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
} from '@chakra-ui/react'

import { FaGoogle, FaEyeSlash, FaEye, FaUserAlt } from 'react-icons/fa'
import { LockIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo_type.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from '../../services/firebase'

function LogIn() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => setShowPassword(!showPassword)


    function handleLogIn() {
        //cadastrar e talz
        navigate("/dashboard", { replace: true });

    }

    function handleGoogleLogIn() {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider).then((res)=>{
            console.log(res)
        })
        navigate("/dashboard", { replace: true });

    }

    return (
        <Flex align='center' justifyContent='center' w="100vw" h="100vh">
            <Container maxW="container.sm" centerContent bgColor={'white'} p={10} borderRadius={'8px'}>
                <VStack
                    // divider={}
                    spacing={3}
                >
                    <Image src={Logo} alt='Logo Plotzer' />
                    <form>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                            <InputLeftElement children={<FaUserAlt />} />
                            <Input type='email' placeholder='Insira seu e-mail' />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha</FormLabel>
                            <InputGroup>
                            <InputLeftElement children={<LockIcon />} />
                                <Input type={showPassword ? 'text' : 'password'} placeholder='Insira uma senha' />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick} variant="outline">
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button colorScheme='teal' variant='solid' onClick={handleLogIn} marginTop='20px'>Logar</Button>
                    </form>
                    <Center height='20px' w="100%">
                        <Divider orientation='horizontal' borderColor='gray.300' />
                        <Text>ou</Text>
                        <Divider orientation='horizontal' borderColor='gray.300' />
                    </Center>
                    <Button leftIcon={<Icon as={FaGoogle} />} colorScheme='teal' variant='solid' onClick={handleGoogleLogIn}><Divider orientation='vertical' borderColor='gray.300' h={'60%'} p={1} />Logar com Google</Button>
                </VStack>
            </Container>
        </Flex>
    )
}
export default LogIn