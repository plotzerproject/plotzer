import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base from "../../../components/Base";
import Loading from "../../Loading";
import { api } from "../../../services/api";
import {
    Button, HStack, VStack, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Badge, Avatar, Text, Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Select, Tooltip, IconButton
} from "@chakra-ui/react";
import TeamInfo from "../../../components/TeamInfo";
import { CloseIcon } from "@chakra-ui/icons";

function TeamMembers() {
  let navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
    const { id_team } = useParams();
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})

    const [memberInvite, setMemberInvite] = useState("")
    const [roleMember, setRoleMember] = useState("")

    const [members, setMembers] = useState([])

    const [me, setMe] = useState({})

    const userLC = JSON.parse(localStorage.getItem("user"))

    async function getTeam() {
        try {
            const teams = await api.get(`/team/${id_team}/members`);
            setTeam(teams.data.data);
            const m = teams.data.data.attributes.members.sort((a, b)=>{
                return a.tag.localeCompare(b.tag)
            })
            setMembers(m)

            const meIndex = m.findIndex((user)=>user.id === userLC.id)
            setMe(meIndex)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function exec(){
            await getTeam()
            setLoading(false)
        }
        exec()
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

                //melhorar esse userPermissions, eu basicamente tenho que dar um findIndex no colorsTag e mandar ele
                const permissionsIndex = colorsTag.findIndex((c)=>c[0] === roleMember)

                const data = {
                    email: memberInvite,
                    tag: roleMember,
                    userPermissions: permissionsIndex
                }

                // console.log(id_team)
                const a = await api.post(`/team/${id_team}/members/invite`, data);

                setMemberInvite("")
                setRoleMember("")
                setError({});

                getTeam()

                onClose();

                alert("Adicionado!");

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

    async function handleRemoveUser(id){
        try {
            const remove = await api.post(`/team/${id_team}/members/remove`, {id})
            console.log(remove)
            await getTeam()
        } catch (err) {
            console.log(err)
        }
    }

    if (loading && Object.keys(team) !== 0) {
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
                                members ? members.map((member) => (
                                    <Tr key={member.id}>
                                        <Td>
                                            <HStack w="70%" justify={'space-between'}>
                                                <HStack onClick={()=>navigate(`/profile/${member.id}`)} cursor='pointer' >
                                                {member.photo && <Avatar
                                                    name={member.name}
                                                    size="sm"
                                                    src={member.photo}
                                                />}

                                                <Text textDecor={'underline'}>
                                                    {member.name}
                                                </Text>
                                                </HStack>
                                                {
                                                    me && members[me].userPermissions > 2 && members[me].userPermissions > member.userPermissions ? 
                                                    member !== members[me] ?  <Tooltip label={`Remover usuário "${member.name}"`} placement="right">
                                                        <IconButton
                                                        color={"white"}
                                                        aria-label={`Remover usuário "${member.name}"`}
                                                        onClick={()=>handleRemoveUser(member.id)}
                                                        h="32px"
                                                        icon={<CloseIcon />}
                                                        />
                                                    </Tooltip> 
                                                    : null
                                                  : null
                                                }
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
                                        colorsTag.map((color, key) => {
                                            if(color[0] !== "owner") {
                                                return <option key={key} value={color[0]}>{color[0]}</option>
                                            } else {
                                                return null;
                                            }
                                        })
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