import { Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import assignments from "../../utils/assigments";
import Assignment from "../Assignment";

function NextAssignments() {
    
    return (
        <Flex bgColor={'gray.300'} h="100%" w="95%" borderRadius={'md'}>
            <VStack w="100%">
                <Heading p="15px 25px 10px 25px" w="100%">Próximos</Heading>
                <Divider w="100%" borderColor={'red.900'}/>
                {assignments.map((item, indice)=>{
                    if(indice < 3) {
                        return (
                            <Assignment data={item} key={item.id}/>
                        )
                    }
                })}
            </VStack>
        </Flex>
    )
}
export default NextAssignments