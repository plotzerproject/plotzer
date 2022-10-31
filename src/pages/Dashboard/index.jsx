import { Alert, AlertDescription, AlertIcon, Box, Button, GridItem, Grid, Heading, HStack, Icon, VStack, Text } from "@chakra-ui/react";
import NextAssignments from "../../components/NextAssignments";
import Warnings from "../../components/Warnings";
import { useAuth } from "../../hooks/useAuth";
import Base from "../../components/Base";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Loading from "../Loading";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/strings";

function Dashboard() {

  let navigate = useNavigate();

  let { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const [assignments, setAssignments] = useState([])
  const [teams, setTeams] = useState([])
  const [error, setError] = useState({})
  const [errorGetAssignment, setErrorGetAssignment] = useState({})

  useEffect(() => {

    async function getMyAssignments() {
      setLoading(true);
      try {
        const req = await api.get("/assignment/@me/my-assignments/");
        setAssignments(req.data.data)
      } catch (error) {
        if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
          console.log(error)
          setErrorGetAssignment({
            title: "Assignment",
            subtitle: error.response.data.errors[0].title,
            detail: error.response.data.errors[0].detail
          })
        }
      }
    }

    async function getMyTeams() {
      setLoading(true);
      try {
        const teamsReq = await api.get("/user/@me/teams/");
        setTeams(teamsReq.data.data);
      } catch (error) {
        console.log(error)
        if (error.response.data.errors[0].title === "ERR_USER_DOES_NOT_HAVE_TEAM") {
          setError({
            title: "Equipe",
            subtitle: error.response.data.errors[0].title,
            detail: error.response.data.errors[0].detail
          })
        }
      }
      setLoading(false);
    }
    getMyTeams()
    getMyAssignments()
    setLoading(false)
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <Base padding={'0'}>
        <VStack w={"75%"} h="100%" p="24px 24px 0 24px">
          <HStack w={"100%"} h="70%" mb={'12px'}>
            <VStack w={"50%"} h="100%">
              <Heading>Olá, {user.name}</Heading>
            </VStack>
            <VStack
              h="100%"
              w={"50%"}
              p="24px"
              bgColor={"gray.300"}
              borderRadius="md"
            >
              <Heading fontSize={"xl"} lineHeight="7" fontWeight={"semibold"}>
                Principais Equipes
              </Heading>
              {teams.length !== 0 ?
              <Grid
              templateColumns='1fr 1fr'
              gap={4}
            >
              {teams.slice(0, 4).map((team)=>{
                return <GridItem w="150px" h="150px" key={team.id} onClick={()=>navigate(`/teams/${team.id}`)} cursor='pointer'>
                {team.attributes.photo ? <Box w="100%" h="100%" backgroundImage={team.attributes.photo} backgroundRepeat="no-repeat" backgroundPosition={'cover'} /> : <Box w="100%" h="100%" bg={'gray.500'}><Text fontWeight={'bold'} fontSize='6xl' textAlign={'center'}>{getInitials(team.attributes.name)}</Text></Box>}
              </GridItem>
              })}
            </Grid>
                :
                <VStack justify={'center'} align='center' h="100%">
                  <HStack>
                    <Box bg="gray.500" w="150px" h="150px" p={4} color="white" onClick={() => alert("a")} justifyContent='center' alignItems={'center'} borderRadius='8px' cursor={'pointer'}>
                      <VStack w="100%" h="100%" justifyContent='center' alignItems={'center'}>
                        <Icon as={FaPlusSquare} fontSize="80px" />
                        <Heading fontSize={'lg'}>Join a team</Heading>
                      </VStack>
                    </Box>
                    <Box bg="gray.500" w="150px" h="150px" p={4} color="white" onClick={() => alert("a")} justifyContent='center' alignItems={'center'} borderRadius='8px' cursor={'pointer'}>
                      <VStack w="100%" h="100%" justifyContent='center' alignItems={'center'}>
                        <Icon as={FaPlusSquare} fontSize="80px" />
                        <Heading fontSize={'lg'}>Create a team</Heading>
                      </VStack>
                    </Box>
                  </HStack>
                </VStack>}
            </VStack>
          </HStack>
          <NextAssignments assignments={assignments} error={Boolean(assignments)} />
        </VStack>
        <VStack w={"25%"} bgColor={"blue.100"} h="100%">
          <Warnings />
        </VStack>
      </Base>
    );
  }

}
export default Dashboard;
