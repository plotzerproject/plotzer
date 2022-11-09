import { Box, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaClock, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/strings";

function AssignmentAdm(data) {
  let navigate = useNavigate();

  const assignment = data.data

  async function handleOpenAssignment() {
    navigate(`/teams/${assignment.attributes.team}/assignments/${assignment.id}`)
  }

  const getMembers = () => {
    const received = assignment.attributes.users.filter((u) => u.status === "received")
    const total = assignment.attributes.users.length
    return { sent: total - received.length, total }
  }

  return (
    <>
      <Flex h="70px" w="100%" bgColor={'cyan.200'} cursor='pointer' justifyContent="space-between" alignItems={'center'} p="16px 25px" borderRadius={'md'} onClick={handleOpenAssignment} m="8px 0">
        <HStack>
          <Box w="50px" h="50px" bgColor={'gray.400'} bgImage={assignment.attributes.assignment.photo ? assignment.attributes.assignment.photo : ""} bgSize='100% 100%' bgPosition={'center'} />
          <VStack alignItems={'center'}>
            <Heading fontSize={'md'} lineHeight={'1'}>{capitalizeFirstLetter(assignment.attributes.assignment.title)}</Heading>
          </VStack>
        </HStack>
        <HStack>
          <HStack>
            <Icon
              as={FaUserFriends}
              fontSize="24px"
            />
            <Heading fontSize={'lg'} fontWeight='bold'>
              {
                `${getMembers().sent}/${getMembers().total}`
              }
            </Heading>
          </HStack>
        </HStack>
      </Flex>
    </>
  );
}
export default AssignmentAdm;
