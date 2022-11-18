import HeaderLanding from "../../components/Header/landing"
import LandingFirst from "../../assets/landing_first.png";
import LandingPlotzer from "../../assets/landing_o_que_plotzer.png";
import Waves from "../../assets/waves_landing.png";
import BePlotzer from "../../assets/be_plotzer.png";
import { Box, Button, Flex, Grid, GridItem, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function Home() {
    const navigate = useNavigate()

    return (
        <Flex bgColor={'gray.50'} flexDir='column'>
            <HeaderLanding></HeaderLanding>
            <Flex bgColor={'gray.100'} justifyContent='center'>
                <Flex maxW={'928px'} p="60px">
                    <Grid templateColumns={'1fr 1fr'} alignItems='center' justifyContent={'center'} gap='70px'>
                        <GridItem>
                            <Heading fontSize={'5xl'} as='h1'>Acelere sua produtividade</Heading>
                            <Text fontSize={'xl'}>Com o Plotzer existe a possibilidade de você acelerar seus projetos em conjunto de sua equipe. </Text>
                            <Button colorScheme="teal" onClick={() => { navigate("/offers") }}>Saiba mais</Button>
                        </GridItem>
                        <GridItem>
                            <Image src={LandingFirst} alt="sasd" w={'364px'} />
                        </GridItem>
                    </Grid>
                </Flex>
            </Flex>
            <Flex justifyContent='center'>
                <Flex maxW="1024px" p="60px">
                    <Grid templateColumns={'1fr 1fr'} alignItems='center' justifyContent={'center'} gap='30px'>
                        <GridItem>
                            <Image src={LandingPlotzer} alt="sasd" w={'430px'} h="320px" />
                        </GridItem>
                        <GridItem>
                            <Heading fontSize={'4xl'} as='h2'>O que é o Plotzer</Heading>
                            <Text m='10px 0' fontSize={'xl'}>Plotzer é um software de gestão empresarial responsável pela integração e organização dos módulos de uma empresa ou equipe.</Text>
                            <Text m='10px 0' fontSize={'xl'}>Com o Plotzer você pode acelerar sua produtividade através de controle de tarefas, metodologias ágeis entre outros.</Text>
                        </GridItem>
                    </Grid>
                </Flex>
            </Flex>
            <Flex bgColor={'gray.100'} justifyContent='center'>
                <Flex maxW={'928px'} p="60px" justifyContent={'space-between'}>
                    <Heading fontSize={'4xl'} as='h2'>Como o Plotzer funciona?</Heading>
                </Flex>
            </Flex>
            <Flex h="425px" justifyContent='center' backgroundImage={Waves} backgroundRepeat={'no-repeat'} backgroundSize='100% 100%' backgroundPosition={'center center'}>
                <VStack w={'768px'} p="32px">
                    <Heading fontSize={'2xl'} as='h3' color={'white'} mb='20px'>Por que escolher o Plotzer?</Heading>
                        <Grid templateColumns={'1fr 1fr 1fr 1fr 1fr'} alignItems='center' justifyContent={'center'} gap='16px'>
                            <GridItem>
                                <Box
                                    w={'125px'}
                                    h={'125px'}
                                    borderRadius='50%'
                                    backgroundColor={'white'}
                                />
                                <Text
                                    fontSize={'md'}
                                    fontWeight='semibold'
                                    color={'white'}
                                    textAlign={'center'}
                                    w="130px"
                                >Lorem ipsum dolor sit amet</Text>
                            </GridItem>
                            <GridItem>
                                <Box
                                    w={'125px'}
                                    h={'125px'}
                                    borderRadius='50%'
                                    backgroundColor={'white'}
                                />
                                <Text
                                    fontSize={'md'}
                                    fontWeight='semibold'
                                    color={'white'}
                                    w="130px"
                                    textAlign={'center'}
                                >Lorem ipsum dolor sit amet</Text>
                            </GridItem>
                            <GridItem>
                                <Box
                                    w={'125px'}
                                    h={'125px'}
                                    borderRadius='50%'
                                    backgroundColor={'white'}
                                />
                                <Text
                                    fontSize={'md'}
                                    fontWeight='semibold'
                                    color={'white'}
                                    w="130px"
                                    textAlign={'center'}
                                    >Lorem ipsum dolor sit amet</Text>
                            </GridItem>
                            <GridItem>
                                <Box
                                    w={'125px'}
                                    h={'125px'}
                                    borderRadius='50%'
                                    backgroundColor={'white'}
                                />
                                <Text
                                    fontSize={'md'}
                                    fontWeight='semibold'
                                    color={'white'}
                                    w="130px"
                                    textAlign={'center'}
                                    >Lorem ipsum dolor sit amet</Text>
                            </GridItem>
                            <GridItem>
                                <Box
                                    w={'125px'}
                                    h={'125px'}
                                    borderRadius='50%'
                                    backgroundColor={'white'}
                                />
                                <Text
                                    fontSize={'md'}
                                    fontWeight='semibold'
                                    color={'white'}
                                    w="130px"
                                    textAlign={'center'}
                                >Lorem ipsum dolor sit amet</Text>
                            </GridItem>
                        </Grid>
                </VStack>
            </Flex>
            <Flex justifyContent='center'>
                <Flex maxW={'768px'} p="60px">
                    <Grid templateColumns={'1fr 1fr'} alignItems='center' justifyContent={'center'} gap='40px'>
                        <GridItem>
                            <Heading fontSize={'3xl'} as='h2'>Seja um usuário Plotzer</Heading>
                            <Text fontSize={'18px'} lineHeight='7'>Cadastre-se agora mesmo e tenha acesso a diversas funcionalidades essenciais para sua equipe por um preço acessível!</Text>
                            <Button colorScheme="teal" onClick={() => { navigate("/offers") } }mt="8px">Saiba mais</Button>
                        </GridItem>
                        <GridItem>
                            <Image src={BePlotzer} alt="sasd" w={'364px'} />
                        </GridItem>
                    </Grid>
                </Flex>
            </Flex>
            <Footer />
        </Flex>
    )
}
export default Home