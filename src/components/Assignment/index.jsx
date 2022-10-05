import { Box, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../functions/strings";

function Assignment(data) {
  return (
    <>
      <Flex h="70px" w="100%" bgColor={'red.400'} justifyContent="space-between" alignItems={'center'} p="16px">
        <HStack>
          <Box w="50px" h="50px" bgColor={'gray.400'} bgImage={data.data.img ? data.data.img : ""} bgSize='100% 100%' bgPosition={'center'}/>
          <VStack alignItems={'center'}>
            <Heading fontSize={'md'} lineHeight={'1'}>{capitalizeFirstLetter(data.data.title)}</Heading>
            {
              data.data.subtitle ? (
                <Text w="100%" fontSize={'sm'} lineHeight={'1'} fontWeight='normal'>{data.data.subtitle.team ? capitalizeFirstLetter(data.data.subtitle.team) : capitalizeFirstLetter(data.data.subtitle.area)}</Text>
              ) : <></>
            }
          </VStack>
        </HStack>
        <HStack>
          <Icon as={FaClock} fontSize={'xl'}/>
          <Text>Envio até xx:xx</Text>
        </HStack>
      </Flex>
    </>
  );
}
export default Assignment;
