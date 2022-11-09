import { Alert, AlertDescription, AlertIcon, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import Assignment from "../Assignment";

function NextAssignments({ assignments, error, showTeam }) {

    const receivedAssignments = assignments.filter((assignment) => assignment.attributes.status == "received")

    return (
        <Flex bgColor={'gray.300'} h="100%" w="100%" borderRadius={'md'}>
            <VStack w="100%">
                <Heading p="15px 25px 10px 25px" w="100%">Próximos</Heading>
                <Divider w="100%" borderColor={'red.900'} />
                    {receivedAssignments.length !== 0 ? receivedAssignments.slice(0, 3).map((item, indice) => {
                        return <Assignment data={item} key={item.id} showTeam={showTeam}/>
                    }) : !error ? 
                    <Alert status='sucess'>
                    <AlertIcon />
                    <AlertDescription>Nenhuma atividade pendente</AlertDescription>
                  </Alert> : <Alert status='error' h="70px">
                    <AlertIcon />
                    <AlertDescription>Nenhuma atividade encontrada</AlertDescription>
                  </Alert>}
            </VStack>
        </Flex>
    )
}
export default NextAssignments