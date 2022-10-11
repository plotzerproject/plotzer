import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/strings";
import Header from "../Header";
import NavBar from "../NavBar";

function Base({ children }) {
  const [user, setUser] = useState("Guilherme Andrade");
  const location = useLocation()
  let page = location.pathname.substring(1)
  page = capitalizeFirstLetter(page)
  return (
    <Flex>
      <NavBar />
      <Flex w="100%" flexDirection={"column"}>
        <Header page={page} user={user} />
        <Flex h="100%" p="24px" w="100%">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Base;
