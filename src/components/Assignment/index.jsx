import { Box, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../utils/strings";

function Assignment(data) {
  const assignment = data.data

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
    const date = new Date()
    const dateLimit = new Date(assignment.attributes.assignment.dateLimit)
    const diffInMs = dateLimit - date
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if(date > dateLimit) {
      return [colors.free, `Send until ${dateLimit.getDate()}/${dateLimit.getMonth()}/${dateLimit.getFullYear()}`, colors.freeIcon]
    } else if(diffInDays < 5) {
      return [colors.warn, `Send until ${dateLimit.getDate()}/${dateLimit.getMonth()}/${dateLimit.getFullYear()}`, colors.warnIcon]
    } else {
      return [colors.late, `You're late!`, colors.lateIcon]
    }
  }
  const verifyTime = fnVerifyTime()

  return (
    <>
      <Flex h="70px" w="100%" bgColor={verifyTime[0]} justifyContent="space-between" alignItems={'center'} p="16px" borderRadius={'md'}>
        <HStack>
          <Box w="50px" h="50px" bgColor={'gray.400'} bgImage={assignment.attributes.assignment.photo ? assignment.attributes.assignment.photo : ""} bgSize='100% 100%' bgPosition={'center'}/>
          <VStack alignItems={'center'}>
            <Heading fontSize={'md'} lineHeight={'1'}>{capitalizeFirstLetter(assignment.attributes.assignment.title)}</Heading>
            {
              typeof assignment.attributes.team == "object" && (
                <Text w="100%" fontSize={'sm'} lineHeight={'1'} fontWeight='normal'>{capitalizeFirstLetter(assignment.attributes.team.name)}</Text>
              )
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
