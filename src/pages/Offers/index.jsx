import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLanding from "../../components/Header/landing";
import CartOffers from "../../assets/cart_offers.png";
import { api } from "../../services/api";
import Loading from "../Loading";
import Waves from "../../assets/waves_landing.png";
import RequestPlotzer from "../../assets/offers_find_plan.png";

import {
    Flex, Text, Heading, GridItem, Button, Image, Grid, VStack, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Footer from "../../components/Footer";

function Offers() {
    const navigate = useNavigate()
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getPlans() {
            setLoading(true)
            const a = await api.get("/plan")
            setPlans(a.data.data)
            setLoading(false)
        }
        getPlans()
    }, [])

    return (
        <Flex bgColor={'gray.50'} flexDir='column'>
            <HeaderLanding></HeaderLanding>
            <Flex bgColor={'gray.100'} justifyContent='center'>
                <Flex maxW={'1024px'} p="60px">
                    <Grid templateColumns={'1fr 1fr'} alignItems='center' justifyContent={'center'} gap='150px'>
                        <GridItem>
                            <Image src={CartOffers} alt="sasd" w={'364px'} />
                        </GridItem>
                        <GridItem textAlign='right'>
                            <Heading fontSize={'5xl'} as='h1'>Planos e Preços</Heading>
                            <Text fontSize={'xl'} m={'5px 0 10px 0'} >Confira as vantagens de cada plano do Plotzer e cadastre-se. </Text>
                            <Button colorScheme="teal">Saiba mais</Button>
                        </GridItem>
                    </Grid>
                </Flex>
            </Flex>
            <Flex bgColor={'gray.50'} justifyContent='center'>
                <Flex w={'1024px'}>
                    <VStack backgroundColor={'white'} border='1px' borderColor={'gray.200'} color='black' w="100%" p="30px 44px 44px 44px" textAlign={'left'}>
                        <Heading fontSize={'3xl'} as='h2' w='100%'>Escolha um plano:</Heading>
                        <TableContainer>
                            <Table variant='striped' colorScheme='teal' color={'gray.600'}s>
                                <Thead>
                                    <Tr >
                                        <Th></Th>
                                        <Th textAlign={"center"}>Ferro</Th>
                                        <Th textAlign={"center"}>Ouro</Th>
                                        <Th textAlign={"center"}>Esmeralda</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td textAlign={"center"}>Criar Equipes</Td>
                                        <Td textAlign={"center"}>Uma Equipe</Td>
                                        <Td textAlign={"center"}>Cinco Equipes</Td>
                                        <Td textAlign={"center"}>Ilimitado</Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Entrar em equipes</Td>
                                        <Td textAlign={"center"}>Três equipes</Td>
                                        <Td textAlign={"center"}>Quinze Equipes</Td>
                                        <Td textAlign={"center"}>Ilimitado</Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Controle de Tarefas</Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Metodologias Kanban</Td>
                                        <Td textAlign={"center"}>Três Quadros</Td>
                                        <Td textAlign={"center"}>Quinze Quadros</Td>
                                        <Td textAlign={"center"}>Ilimitado</Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Controle de Estoque</Td>
                                        <Td textAlign={"center"}><CloseIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Relatório de Vendas</Td>
                                        <Td textAlign={"center"}><CloseIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Emissão de Boletos</Td>
                                        <Td textAlign={"center"}><CloseIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign={"center"}>Controle de Finanças</Td>
                                        <Td textAlign={"center"}><CloseIcon /></Td>
                                        <Td textAlign={"center"}><CloseIcon /></Td>
                                        <Td textAlign={"center"}><CheckIcon /></Td>
                                    </Tr>

                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th></Th>
                                        <Th><Button colorScheme="teal">Selecionar</Button></Th>
                                        <Th><Button colorScheme="teal">Selecionar</Button></Th>
                                        <Th><Button colorScheme="teal">Selecionar</Button></Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </VStack>
                </Flex>
                {/* {loading ? <Loading /> :
                    <Flex >
                        {plans !== [] && plans.map((plan, indice) => {
                            return <Flex key={indice} border='1px'>
                                <Heading>{plan.attributes.name}</Heading>
                                <Text>R$ {plan.attributes.price}</Text>
                                <Link to={`/signup?plan=${plan.id}`}>Selecionar</Link>
                            </Flex>
                        })}
                    </Flex>
                } */}
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
                                >Lorem ipsum dolor sit amet</Text>
                            </GridItem>
                        </Grid>
                    </VStack>
                </Flex>
                <Flex justifyContent='center'>
                    <Flex maxW={'768px'} p="60px">
                        <Grid templateColumns={'1fr 1fr'} alignItems='center' justifyContent={'center'} gap='40px'>
                            <GridItem>
                                <Heading fontSize={'3xl'} as='h2'>Buscando um plano personalizado?</Heading>
                                <Text fontSize={'18px'} lineHeight='7'>Entre em contato conoso que a nossa equipe pode negociar com a sua em busca do melhor plano custo-benefício para você!.</Text>
                                <Button colorScheme="teal" onClick={() => { navigate("/offers") }}mt="8px">Saiba mais</Button>
                            </GridItem>
                            <GridItem>
                                <Image src={RequestPlotzer} alt="sasd" w={'364px'} />
                            </GridItem>
                        </Grid>
                    </Flex>
                </Flex>
                <Footer />
        </Flex>
    )
}
export default Offers