import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
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

import { api } from "../../../services/api";

import "./styles.css";
import NextAssignments from "../../../components/NextAssignments";

import MessageNotFoundImg from "../../../assets/team_img_msg_not_found.png";

function Team() {
  const { id_team } = useParams();
  const [team, setTeam] = useState({});
  const [assignments, setAssignments] = useState([])
  const [fixed, setFixed] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({})

  const [msgs, setMsgs] = useState([]);

  const loadData = (data) => {
    const values = _.groupBy(data, (value) => {
      return value.title;
    });
    const result = _.map(values, (value, key) => {
      return [key, _.sumBy(values[key], (v) => v.value)];
    });

    return [["User", "Reputation"], ...result];
  };

  useEffect(() => {
    async function getTeam() {
      setLoading(true);
      try {
        const t = await api.get(`/team/${id_team}?fixed=true`);
        setTeam(t.data.data);

        const data = [
          { title: "Reputation", value: t.data.data.attributes.stats },
          {
            title: "Negative",
            value: 100 - t.data.data.attributes.stats,
          },
        ];
        const statsData = loadData(data);
        setStats(statsData);

        setFixed([
          {
            id: "1",
            author: "1",
            title: "Teste salve 1",
            content: "lorem ipsum dolor sit amet",
          },
          {
            id: "2",
            author: "1",
            title: "Teste salve 2",
            content: "lorem ipsum dolor sit amet",
          },
          {
            id: "3",
            author: "1",
            title: "Teste salve 3",
            content: "lorem ipsum dolor sit amet",
          },
          {
            id: "4",
            author: "1",
            title: "Teste salve 4",
            content: "lorem ipsum dolor sit amet",
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    async function getMyAssignments() {
      setLoading(true);
      try {
        const req = await api.get(`/assignment/@me/team/${id_team}`);
        setAssignments(req.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        if (error.response.data.errors[0].title === "ERR_ASSIGNMENT_NOT_FOUND") {
          setError({
            title: "Assignment",
            subtitle: error.response.data.errors[0].title,
            detail: error.response.data.errors[0].detail
          })
          setLoading(false)
        }
      }
    }

    getTeam();
    getMyAssignments()
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Base title={team.attributes.name} padding={"0"}>
        <VStack w={"75%"} h="100%">
          <Flex
            w="100%"
            h="300px"
            p="30px"
            pos={"relative"}
            backgroundColor={"gray.300"}
            backgroundImage={team.attributes.background}
            backgroundRepeat="no-repeat"
            backgroundSize={"cover"}
          >
            <TeamInfo team={team} />
            <ButtonGroup pos={"absolute"} bottom="15px" right="30px">
              <Button colorScheme="teal">Kanban</Button>
              <Button colorScheme="teal">Stats</Button>
            </ButtonGroup>
          </Flex>
          <VStack w="100%" p="0px 15px 0px 15px" h="100%">
            <HStack w="100%" h="100%">
              <Swiper
                // navigation={true}
                pagination={true}
                // modules={[Navigation, Pagination]}
                modules={[Pagination]}
                className="mySwiper"
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
              </Swiper>
              <Flex
                flexDir={"column"}
                w="50%"
                backgroundColor={"gray.300"}
                borderRadius="md"
                p="20px"
              >
                <HStack w="100%">
                  <Heading fontSize={"2xl"} lineHeight="7">
                    Fixed's
                  </Heading>
                  <Icon as={FaThumbtack} fontSize="24px" color={"#D82525"} />
                </HStack>
                <VStack w="100%" mt={"20px"}>
                  {fixed.length !== 0 &&
                    fixed.slice(0, 4).map((f) => {
                      return (
                        <Flex
                          key={f.id}
                          w="100%"
                          h="45px"
                          backgroundColor={"white"}
                          borderRadius="md"
                          justify={"center"}
                          align="center"
                        >
                          <Text fontWeight={"bold"}>{f.title}</Text>
                        </Flex>
                      );
                    })}
                </VStack>
              </Flex>
            </HStack>
            <NextAssignments assignments={assignments}/>
          </VStack>
        </VStack>
        <VStack w={"25%"} bgColor={"gray.100"} h="100%">
          <HStack
            w="100%"
            h="60px"
            justify={"space-between"}
            p="12px 12px 0 12px"
          >
            <HStack>
              <Icon as={FaHashtag} fontSize="24px" color={"black"} />
              <Heading fontSize={"2xl"} lineHeight="7">
                General
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
            {msgs.length !== 0 ? (
              <></>
            ) : (
              <VStack>
                <Image src={MessageNotFoundImg} alt="Messages not found" />
                <Heading fontSize={"lg"} as={"h4"} fontWeight="medium">
                  No messages found in this team.
                </Heading>
                <Text fontSize={"md"} fontWeight="normal">
                  Start the chat with a "hey!"
                </Text>
              </VStack>
            )}

            <InputGroup
              size="lg"
              w="90%"
              pos={"absolute"}
              left="20px"
              bottom="15px"
            >
              <Input pr="4.5rem" type={"text"} placeholder="Write a message" />
              <InputRightElement width="4.5rem">
                <Button size="lg" colorScheme="teal" h="100%">
                  Enviar
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </VStack>
      </Base>
    );
  }
}

export default Team;
