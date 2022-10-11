import { Box, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../utils/strings";

function Assignment(data) {
  const colors = {
    free: 'green.100',
    warn: 'yellow.100',
    late: 'red.100',
    freeIcon: 'green.400',
    warnIcon: 'yellow.400',
    lateIcon: 'red.600'
  }
  const fnVerifyTime = () => {
    //se ta no prazo
    if(colors) {
      return [colors.free, `Send until ${data.limit}`, colors.freeIcon]
    } else if(colors) {
      return [colors.warn, `Send until ${data.limit}`, colors.warnIcon]
    } else {
      return [colors.late, `You're late!`, colors.lateIcon]
    }
  }
  const verifyTime = fnVerifyTime()

  return (
    <>
      <Flex h="70px" w="100%" bgColor={verifyTime[0]} justifyContent="space-between" alignItems={'center'} p="16px" borderRadius={'md'}>
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
          <Icon as={FaClock} fontSize={'2xl'} color={verifyTime[2]}/>
          <Text>{verifyTime[1]}</Text>
        </HStack>
      </Flex>
    </>
  );
}
export default Assignment;
