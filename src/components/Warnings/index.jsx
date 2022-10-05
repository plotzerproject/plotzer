import { Flex, Heading, HStack, Icon, Spacer, VStack } from "@chakra-ui/react";
import { FaThumbtack } from "react-icons/fa";

function Warnings() {
  const warns = [
    {
      title: "Lorem ipsum1",
      content: "lorem ipsum dolor sit amet",
      team: 1,
      id: 1
    },
    {
      title: "Lorem ipsum2",
      content: "lorem ipsum dolor sit amet",
      team: 3,
      id: 2
    },
    {
      title: "Lorem ipsum3",
      content: "lorem ipsum dolor sit amet",
      team: 2,
      id: 3
    },
    {
      title: "Lorem ipsum4",
      content: "lorem ipsum dolor sit amet",
      team: 5,
      id: 4
    },
    {
      title: "Lorem ipsum5",
      content: "lorem ipsum dolor sit amet",
      team: 8,
      id: 5
    },
    {
      title: "Lorem ipsum6",
      content: "lorem ipsum dolor sit amet",
      team: 4,
      id: 6
    },
  ];

  return (
    <>
      <Flex bgColor={"gray.100"} w={"100%"} p="16px" flexDirection={"column"}>
        <Flex justifyContent={"space-between"} alignItems="center" w="100%">
          <Heading fontSize={"2xl"} lineHeight="7">
            Avisos
          </Heading>
          <Icon as={FaThumbtack} w="32px" h="32px" color={"red.600"} />
        </Flex>
        <VStack>
          {warns.map((item, indice) => {
            if (indice < 5) {
              return (<HStack
                key={item.id}
                bgColor={"white"}
                w="100%"
                p="10px"
                h="48px"
                mt="16px"
                borderRadius={"md"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent="center"
              >
                <Heading fontSize={"md"} fontWeight="medium">
                  {item.title}
                </Heading>
              </HStack>)
            }
          })}
        </VStack>
      </Flex>
    </>
  );
}
export default Warnings;
