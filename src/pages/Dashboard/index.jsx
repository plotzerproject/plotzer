import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import NextAssignments from "../../components/NextAssignments";
import Warnings from "../../components/Warnings";
import { useAuth } from "../../hooks/useAuth";
import Base from "../../components/Base";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Loading from "../Loading";

function Dashboard() {
  let { user } = useAuth();
  const [loading,setLoading] = useState(true)
  const [assignments, setAssignments] = useState([])
  const [error, setError] = useState({})

  useEffect(()=>{
    async function getMyAssignments() {
      setLoading(true);
      try {
        const req = await api.get("/assignment/@me/my-assignments/");
        setAssignments(req.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
          setError({
            title: "Assignment",
            subtitle: error.response.data.errors[0].title,
            detail: error.response.data.errors[0].detail
          })
          setLoading(false)
        }
      }
    }

    getMyAssignments()
  }, [])

  if(loading) {
    return <Loading />
  } else {
    return (
      <Base padding={'0'}>
        <VStack w={"75%"} h="100%" p="24px 24px 0 24px">
          <HStack w={"100%"} h="60%" mb={'12px'}>
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
              <HStack>
                <Box bg="tomato" w="150px" h="150px" p={4} color="white" />
                <Box bg="tomato" w="150px" h="150px" p={4} color="white" />
              </HStack>
              <HStack>
                <Box bg="tomato" w="150px" h="150px" p={4} color="white" />
                <Box bg="tomato" w="150px" h="150px" p={4} color="white" />
              </HStack>
            </VStack>
          </HStack>
          <NextAssignments assignments={assignments}/>
        </VStack>
        <VStack w={"25%"} bgColor={"blue.100"} h="100%">
          <Warnings />
        </VStack>
      </Base>
    );
  }

}
export default Dashboard;
