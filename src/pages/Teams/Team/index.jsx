import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as ReactLink} from "react-router-dom";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { Chart } from "react-google-charts";
import _ from "lodash";

import { FaThumbtack, FaHashtag, FaCaretDown } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import Base from "../../../components/Base";
import TeamInfo from "../../../components/TeamInfo";
import Loading from "../../Loading";
import InputChat from "../../../components/InputChat";
import NextAssignments from "../../../components/NextAssignments";

import { api } from "../../../services/api";

import "./styles.css";

import MessageNotFoundImg from "../../../assets/team_img_msg_not_found.png";

import { Skeleton } from '@chakra-ui/react'
import { formatDate } from "../../../utils/date";

function Team() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenFixed, onOpen: onOpenFixed, onClose: onCloseFixed } = useDisclosure();
  const [titleFixed, setTitleFixed] = useState("")
  const [contentFixed, setContentFixed] = useState("")

  const { id_team } = useParams();
  const [team, setTeam] = useState({});
  const [assignments, setAssignments] = useState([])
  const [fixed, setFixed] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({})

  const [me, setMe] = useState({})
  // const [error, setError] = useState({})

  let navigate = useNavigate();

  const [msgs, setMsgs] = useState([]);

  const loadData = (data) => {
    const values = _.groupBy(data, (value) => {
      return value.title;
    });
    const result = _.map(values, (value, key) => {
      return [key, _.sumBy(values[key], (v) => v.value)];
    });

    return [["Usuário", "Reputação"], ...result];
  };

  async function getTeam() {
    try {
      const t = await api.get(`/team/${id_team}?fixed=true`);
      setTeam(t.data.data);

      const userLC = JSON.parse(localStorage.getItem("user"))
      const myInfo = t.data.data.attributes.members.find((u) => u.id === userLC.id)
      setMe(myInfo)

      const data = [
        { title: "Reputation", value: t.data.data.attributes.stats },
        {
          title: "Negative",
          value: 100 - t.data.data.attributes.stats,
        },
      ];
      const statsData = loadData(data);
      setStats(statsData);

      setFixed(t.data.data.attributes.fixed);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMyAssignments() {
    try {
      const req = await api.get(`/assignment/@me/team/${id_team}`);
      setAssignments(req.data.data)
    } catch (error) {
      console.log(error)
      if (error.response.data.errors[0].title !== "ERR_ASSIGNMENT_NOT_FOUND") {
        setError(error.response.data.errors[0])
      }
      // if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
      //   console.log
      //   setError({
      //     title: "Assignment",
      //     subtitle: error.response.data.errors[0].title,
      //     detail: error.response.data.errors[0].detail
      //   })
      // }
    }
  }

  async function handleAddFixed(e) {
    e.preventDefault()
    if (titleFixed !== "" && contentFixed !== "") {
      try {
        const data = {
          title: titleFixed,
          content: contentFixed
        }
        const a = await api.post(`/team/${id_team}/fixed`, data)
        setTitleFixed("")
        setContentFixed("")
        onClose()
        await getTeam()
        console.log(a)
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("campos vazios")
    }
  }

  const [fixedSelected, setFixedSelected] = useState({})

  async function getFixedModal(id) {
    const att = team.attributes.fixed.find((f) => f._id === id)
    setFixedSelected(att)
    onOpenFixed()
  }

  useEffect(() => {
    async function exec() {
      setLoading(true)
      await getTeam();
      await getMyAssignments()
      setLoading(false)
    }
    exec()
  }, []);

  if (loading && Object.keys(team) !== 0) {
    return <Loading />;
  } else {
    return (
      <Base title={team.attributes.name || "Teste"} padding={"0"}>
        <VStack w={"75%"} h="100%">
          <Skeleton height='250px' w="100%" isLoaded={!loading}>
            <Flex
              w="100%"
              h="250px"
              p="30px"
              pos={"relative"}
              backgroundColor={"gray.300"}
              backgroundImage={team.attributes.background}
              backgroundRepeat="no-repeat"
              backgroundSize={"cover"}
            >
              <TeamInfo team={team} openMember={true} />
              <ButtonGroup pos={"absolute"} bottom="15px" right="30px">
                {/* <Button colorScheme="teal">Kanban</Button> */}
                {/* <Button colorScheme="teal" onClick={() => navigate(`/teams/${id_team}/stats`)}>Stats</Button> */}
                {me && me.userPermissions >= 2 && <Button colorScheme="teal" onClick={() => navigate(`/teams/${id_team}/assignments/`)}>Tarefas</Button>}
                {me && me.userPermissions >= 4 && <Button colorScheme="teal" onClick={() => alert("editar")}>Editar</Button>}
                {me && me.userPermissions >= 4 && <Button colorScheme="teal" onClick={() => navigate(`/teams/${id_team}/requests/`)}>Ver Requisições</Button>}
                <Button colorScheme="teal" onClick={()=>alert("Proximas Atualizações!")}>Kanban</Button>
                {me && me.userPermissions >= 3 && <Button colorScheme="teal" onClick={() => alert("Proximas atualizações!")}>Gestão Financeira</Button>}
              </ButtonGroup>
            </Flex>
          </Skeleton>
          <VStack w="100%" p="0px 15px 0px 15px" h="100%">
            <HStack w="100%" h="100%" alignItems={'center'}>
              <Swiper
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                // modules={[Pagination]}
                className="swiper1"
              >
                <SwiperSlide>
                  <Chart
                    chartType="PieChart"
                    data={stats}
                    width={"100%"}
                    height={"400px"}
                  />
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
              </Swiper>
              <Flex
                flexDir={"column"}
                w="50%"
                backgroundColor={"gray.300"}
                borderRadius="md"
                p="20px"
              >
                <HStack w="100%" justify={'space-between'}>
                  <HStack>
                    <Heading fontSize={"2xl"} lineHeight="7">
                      Avisos Fixados
                    </Heading>
                    <Icon as={FaThumbtack} fontSize="24px" color={"#D82525"} />
                  </HStack>
                  {me && me.userPermissions >= 4 && <Button colorScheme="teal" onClick={onOpen}>Adicionar Fixado</Button>}
                </HStack>
                <VStack w="100%" mt={"20px"}>
                  {fixed.length !== 0 ?

                    fixed.slice(0, 4).map((f, k) => {
                      return (
                        <Flex
                          key={f._id}
                          w="100%"
                          h="45px"
                          backgroundColor={"white"}
                          borderRadius="md"
                          justify={"center"}
                          align="center"
                          cursor={'pointer'}
                          onClick={() => getFixedModal(f._id)}
                        >
                          <Text fontWeight={"bold"}>{f.title}</Text>
                        </Flex>
                      );
                    })
                    : <Alert status='error'>
                      <AlertIcon />
                      <AlertDescription>Nenhum fixado encontrado</AlertDescription>
                    </Alert>}
                </VStack>
              </Flex>
            </HStack>
            <NextAssignments assignments={assignments} error={Boolean(assignments)} showTeam={false}/>
          </VStack>
        </VStack>
        <VStack w={"25%"} bgColor={"gray.100"} h="100%">
          <HStack
            w="100%"
            h="60px"
            justify={"space-between"}
            p="12px 12px 6px 12px"
          >
            <HStack>
              <Icon as={FaHashtag} fontSize="24px" color={"black"} />
              <Heading fontSize={"2xl"} lineHeight="7">
                Chat Geral
              </Heading>
            </HStack>
            <Icon as={FaCaretDown} fontSize="24px" color={"black"} />
          </HStack>
          <Divider w="100%" orientation="horizontal" borderColor={"gray;200"} />
          <VStack
            h="100%"
            w="100%"
            p="20px"
            pos={"relative"}
            alignItems="center"
            justify={"center"}
          >
            {msgs.length !== 0 ? msgs.map((msg) => {
              <>salve</>
            }) : (
              <VStack>
                <Image src={MessageNotFoundImg} alt="Messages not found" />
                <Heading fontSize={"lg"} as={"h4"} fontWeight="medium">
                  Nenhuma mensagem encontrada aqui.
                </Heading>
                <Text fontSize={"md"} fontWeight="normal">
                  Comece o chat com "Oi"!
                </Text>
              </VStack>
            )}

            <InputChat position={{pos: "absolute", left: "20px", bottom: "15px"}} width="90%"/>
          </VStack>
        </VStack>
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar uma mensagem fixada</ModalHeader>
            <Divider w="100%" />
            <ModalCloseButton />
            <form onSubmit={handleAddFixed}>
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Titulo do Fixado"
                    type={'text'}
                    value={titleFixed}
                    onChange={(e) => setTitleFixed(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Conteudo do fixado"
                    type={'text'}
                    value={contentFixed}
                    onChange={(e) => setContentFixed(e.target.value)}
                  />
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
        {Object.keys(fixedSelected) !== 0 &&
          <Modal isCentered isOpen={isOpenFixed} onClose={onCloseFixed} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{fixedSelected.title}</ModalHeader>
              <Divider w="100%" />
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>{fixedSelected.content}</Text>
              </ModalBody>

              <ModalFooter justifyContent={'space-between'}>
                <Text>
                  {formatDate(fixedSelected.updatedAt)} {fixedSelected.author && <>by <Link as={ReactLink} to={me && me.id === fixedSelected.author.id ? `/profile` : `/profile/${fixedSelected.author.id}`} fontWeight={'semibold'}>{fixedSelected.author.name}</Link></>}
                </Text>
                <Button onClick={onCloseFixed} textColor="white">
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        }
      </Base>
    );
  }
}

export default Team;
