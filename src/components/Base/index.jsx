import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import { capitalizeFirstLetter } from "../../utils/strings";

function Base({ children, padding, title, direction }) {

    let { user } = useAuth();

    const location = useLocation()
    let page = location.pathname.substring(1)
    page = capitalizeFirstLetter(page)

    return (
        <Flex w="100%" h="100%">
            <NavBar />
            <Flex w="100%" flexDirection={"column"}>
                <Header page={title || page} user={user}/>
                <Flex h="100%" w="100%" maxW="100%" p={padding || "24px"} flexDirection={direction} overflowX='hidden'>
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
}
export default Base;
