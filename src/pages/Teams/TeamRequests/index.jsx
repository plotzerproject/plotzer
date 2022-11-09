import { CheckIcon } from "@chakra-ui/icons";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Flex, Grid, GridItem, Heading, HStack, IconButton, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base from "../../../components/Base"
import TeamInfo from "../../../components/TeamInfo"
import { api } from "../../../services/api";
import Loading from "../../Loading";

function TeamRequests() {
    const { id_team } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})
    const [requests, setRequests] = useState([])
    const [team, setTeam] = useState({})

    let navigate = useNavigate();


    async function getRequests() {
        try {
            const req = await api.get(`/team/${id_team}/requests`);
            setRequests(req.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getTeam() {
        try {
            const t = await api.get(`/team/${id_team}?fixed=true`);
            setTeam(t.data.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function exec() {
            await getRequests()
            await getTeam()
            setLoading(false);
        }
        exec()
    }, [])

    async function handleAcceptRequest(id_user) {
        console.log(id_user)
        try {
            const accept = await api.post(`/team/${id_team}/accept/`, { id: id_user })
            await getRequests()
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    if (loading) {
        return <Loading />
    } else if (Object.keys(team).length === 0) {
        return <Heading>Equipe não encontrada!</Heading>
    } else {
        return <Base title={`Requisições de ${team.attributes.name}`} padding='0'>
            <Flex w="100%" h="100%" justify={'center'}>
                <Flex w="70%" h="100%" bgColor={'gray.200'} boxShadow='md' flexDir='column'>
                    <Flex
                        w="100%"
                        h="250px"
                        p="30px"
                        pos={"relative"}
                        backgroundColor={"gray.300"}
                        backgroundImage={team.attributes.background}
                        backgroundRepeat="no-repeat"
                        backgroundSize={"cover"}
                        boxShadow='md'
                    >
                        <TeamInfo team={team} openMember={true} />
                    </Flex>
                    <Flex m={'8px 0'} p="16px" w="100%" h="100%" flexDir={'column'}>
                        <Heading>Requisições:</Heading>
                        <VStack w="100%" h="100%" p="16px">
                            {
                                requests.length !== 0 ? <Grid
                                    templateColumns='1fr 1fr'
                                    gap={4}
                                >
                                    {requests.map((request) => {
                                        return <GridItem key={request.id} w="300px" h="70px" bgColor='gray.300' borderRadius={'8px'} alignItems='center' >
                                            <HStack justifyContent='space-between' w="100%" h="100%" p="12px">
                                                <HStack>
                                                    <Tooltip label="Abrir Perfil" placement="bottom">
                                                        <Avatar
                                                            size='md'
                                                            name={request.attributes.receiver.name}
                                                            src={request.attributes.receiver.photo}
                                                            cursor='pointer'
                                                            onClick={() => navigate(`/profile/${request.attributes.receiver.id}`)}
                                                        />
                                                    </Tooltip>
                                                    <Heading fontSize={'md'}>{request.attributes.receiver.name}</Heading>
                                                </HStack>
                                                <Tooltip label="Aceitar Convite" placement="bottom">
                                                    <IconButton
                                                        aria-label="Aceitar Convite"
                                                        fontSize="32px"
                                                        color='white'
                                                        icon={<CheckIcon />}
                                                        onClick={() => handleAcceptRequest(request.attributes.receiver.id)}
                                                    />
                                                </Tooltip>
                                            </HStack>
                                        </GridItem>
                                    })}
                                </Grid>
                                    : <Heading color={'red'} fontSize='xl'>Nenhuma requisição encontrada!</Heading>
                                    // <Alert status='sucess'>
                                    //     <AlertIcon />
                                    //     <AlertDescription>Nenhuma requisição</AlertDescription>
                                    // </Alert>
                            }
                        </VStack>
                    </Flex>
                </Flex>
            </Flex>
        </Base>
    }
}

export default TeamRequests