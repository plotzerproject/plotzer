import { Box, Heading, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import { getInitials } from '../../utils/strings'
import {
    FaUserFriends,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TeamInfo({ team, openMember }) {
    let navigate = useNavigate();

    function handleOpenMembers() {
        navigate(`/teams/${team.id}/members`)
    }

    return (
        <HStack w="100%" h="100%">
            {team.attributes.photo ?
                <Image src={team.attributes.photo} w='150px' h='150px' /> :
                <Box w='150px' h='150px' backgroundColor={'gray.500'} justifyContent='center'><Heading fontSize="48px" textAlign='center'>{team.attributes && getInitials(team.attributes.name)}</Heading></Box>}
            <VStack textAlign={'left'}>
                <Heading fontSize={'3xl'} fontWeight='semibold' as="h2" lineHeight={'7'}>{team.attributes.name}</Heading>
                <HStack onClick={openMember && handleOpenMembers} cursor={openMember ? "pointer" : "auto"} ml={'8px'}>
                    <Icon as={FaUserFriends} fontSize="32px" />
                    <Text fontSize={'xl'}>{team.attributes.members.length} members</Text>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default TeamInfo