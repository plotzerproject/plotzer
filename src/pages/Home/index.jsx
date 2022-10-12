import HeaderLanding from "../../components/Header/landing"
import LandingFirst from "../../assets/landing_first.png";
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home ( ) {
    const navigate = useNavigate()

    return (
        <Flex bgColor={'gray.50'} flexDir='column'>
            <HeaderLanding></HeaderLanding>
            <Flex bgColor={'gray.100'} justifyContent='center'>
                <Flex maxW={'928px'} p="53px" justifyContent={'space-between'}>
                    <Flex flexDirection={'column'} justifyContent='center'>
                        <Heading>Acelere sua produtividade</Heading>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus dui arcu, nec viverra sem scelerisque quis. </Text>
                        <Button colorScheme="teal" onClick={()=>{navigate("/plans")}}>Saiba mais</Button>
                    </Flex>
                    <Image src={LandingFirst} alt="sasd" w={'364px'}/>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Home