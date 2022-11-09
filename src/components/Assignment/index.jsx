import { Box, Flex, Heading, HStack, Icon, Tag, Text, VStack } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/strings";

function Assignment({ data, showTeam }) {
  let navigate = useNavigate();

  const assignment = data

  async function handleOpenAssignment() {
    navigate(`/assignment/${assignment.attributes.assignment.id}`)
  }

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
    // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (assignment.attributes.status === "received") {
      if (date < dateLimit) {
        return [colors.free, `Enviar até as ${dateLimit.getHours()}h${dateLimit.getMinutes()} do dia ${dateLimit.getDate()}/${dateLimit.getMonth() + 1}/${dateLimit.getFullYear()}`, colors.freeIcon]
        // } else if(diffInDays < 5) {
        //   return [colors.warn, `Send until ${dateLimit.getDate()}/${dateLimit.getMonth()}/${dateLimit.getFullYear()}`, colors.warnIcon]
      } else {
        return [colors.late, `Você está atrasado!`, colors.lateIcon]
      }
    } else if (assignment.attributes.status === "sent") {
      return [colors.free, `Sent at ${dateLimit.getDate()}/${dateLimit.getMonth()}/${dateLimit.getFullYear()}`, colors.freeIcon]//botar como completedAt no date dps
    } else if (assignment.attributes.status === "returned") {
      return [colors.free, `Returned`, colors.freeIcon]//botar como completedAt no date dps
    }
  }
  const verifyTime = fnVerifyTime()


  return (
    <>
      <Flex h="70px" w="100%" bgColor={verifyTime[0]} cursor='pointer' justifyContent="space-between" alignItems={'center'} p="16px 25px" borderRadius={'md'} onClick={handleOpenAssignment} m="8px 0">
        <HStack>
          <Box w="50px" h="50px" bgColor={'gray.400'} bgImage={assignment.attributes.assignment.photo ? assignment.attributes.assignment.photo : ""} bgSize='100% 100%' bgPosition={'center'} />
          <VStack alignItems={'center'}>
            <Heading fontSize={'md'} lineHeight={'1'}>{capitalizeFirstLetter(assignment.attributes.assignment.title)}</Heading>
            {
              typeof assignment.attributes.team == "object" && showTeam ? (<Heading fontSize={'sm'} w="100%" lineHeight={'1'}>{capitalizeFirstLetter(assignment.attributes.team.name)}</Heading>
                // <Text w="100%" fontSize={'sm'} lineHeight={'1'} fontWeight='normal'>{capitalizeFirstLetter(assignment.attributes.team.name)}</Text>
              ) : <HStack w="100%">
                <Tag size={'sm'} variant='solid' colorScheme='teal'>
                  {assignment.attributes.assignment.category}
                </Tag>
              </HStack>
            }
          </VStack>
        </HStack>
        <HStack>
          <Icon as={FaClock} fontSize={'2xl'} color={verifyTime[2]} />
          <Text>{verifyTime[1]}</Text>
        </HStack>
      </Flex>
    </>
  );
}
export default Assignment;
