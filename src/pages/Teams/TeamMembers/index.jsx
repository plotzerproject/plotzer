import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../../../components/Base";
import Loading from "../../Loading";
import { api } from "../../../services/api";
import {
    Button, HStack, VStack, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Badge, Avatar, Text, Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Select
} from "@chakra-ui/react";
import TeamInfo from "../../../components/TeamInfo";

function TeamMembers() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id_team } = useParams();
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})

    const [memberInvite, setMemberInvite] = useState("")
    const [roleMember, setRoleMember] = useState("")

    async function getTeam() {
        setLoading(true);
        try {
            const teams = await api.get(`/team/${id_team}/members`);
            setTeam(teams.data.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTeam()
    }, [])

    const colorsTag = [
        ['member', "green"],
        ['extra', "blue"],
        ['moderator', "red"],
        ['supervisor', "cyan"],
        ['owner', "purple"]
    ]

    async function handleAddMember(e) {
        e.preventDefault();
        if (memberInvite !== "" && roleMember !== "") {
            try {

                const data = {
                    email: memberInvite,
                    tag: roleMember,
                    userPermissions: Number(roleMember.split("r-")[1])
                }

                // console.log(id_team)
                const a = await api.post(`/team/${id_team}/members/invite`, data);
                console.log(a)

                setMemberInvite("")
                setRoleMember("")
                setError({});

                getTeam()

                onClose();

                alert("Created!");

            } catch (err) {
                console.log(err);
                setError(err);
                alert(error);
            }
        } else {
            setError("campos vazios");
            alert(error);
        }
    }


    if (loading) {
        return <Loading />
    } else {
        return <Base title={team.attributes.name}>
            <VStack w="100%" h="100%">
                <HStack justifyContent={'space-between'} alignItems='center' w="100%">
                    <TeamInfo team={team} />
                    <Button colorScheme="teal" onClick={onOpen}>Add member</Button>
                </HStack>
                <TableContainer w="100%">
                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>"{team.attributes.name}" team members</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Role</Th>
                                <Th>Stats</Th>
                                <Th>Active</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                team.attributes.members ? team.attributes.members.map((member) => (
                                    <Tr key={member.id}>
                                        <Td>
                                            <HStack>
                                                {member.id.photo && <Avatar
                                                    name={member.name}
                                                    size="md"
                                                    src={member.id.photo}
                                                />}

                                                <Text>
                                                    {member.name}
                                                </Text>
                                            </HStack>
                                        </Td>
                                        <Td>{member.tag}</Td>
                                        <Td>{member.reputation}%</Td>
                                        <Td>{member.member_active === true ? <Badge colorScheme='green'>Active</Badge> : <Badge colorScheme='red'>Not Active</Badge>}</Td>
                                    </Tr>
                                )
                                ) : null
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a team</ModalHeader>
                    <Divider w="100%" />
                    <ModalCloseButton />
                    <form onSubmit={handleAddMember}>
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder="User's e-mail"
                                    type={'email'}
                                    value={memberInvite}
                                    onChange={(e) => setMemberInvite(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    placeholder="Select the user's role"
                                    value={roleMember}
                                    onChange={(e) => setRoleMember(e.target.value)}
                                >
                                    {
                                        colorsTag.map((color, key) => (
                                            <option key={key} value={color[0]}>{color[0]}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Save
                            </Button>
                            <Button onClick={onClose} textColor="white">
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Base>
    }
}

export default TeamMembers