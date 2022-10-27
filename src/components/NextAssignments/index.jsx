import { Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Assignment from "../Assignment";

function NextAssignments(assignments) {

    return (
        <Flex bgColor={'gray.300'} h="100%" w="100%" borderRadius={'md'}>
            <VStack w="100%">
                <Heading p="15px 25px 10px 25px" w="100%">Próximos</Heading>
                <Divider w="100%" borderColor={'red.900'}/>
                {assignments.assignments.map((item, indice)=>{
                  //depois colocar assignments.slice()
                    if(indice < 3 && item.attributes.status == "received") {
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