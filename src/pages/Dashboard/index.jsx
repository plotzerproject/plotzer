import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import NextAssignments from "../../components/NextAssignments";
import Warnings from "../../components/Warnings";
import { useAuth } from "../../hooks/useAuth";
import Base from "../../components/Base";

function Dashboard() {
  let { user } = useAuth();

  return (
    <Base padding={'0'}>
      <VStack w={"75%"} h="100%">
        <HStack w={"100%"} p="24px" h="60%">
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
        <NextAssignments />
      </VStack>
      <VStack w={"25%"} bgColor={"blue.100"} h="100%">
        <Warnings />
      </VStack>
    </Base>
  );
}
export default Dashboard;
