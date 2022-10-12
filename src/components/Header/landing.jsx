import { Button, ButtonGroup, Container, Flex, Image } from "@chakra-ui/react";
import Logo from "../../assets/logo_type.svg";
import { TbArrowUpRight } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function HeaderLanding() {
  const { authenticated } = useAuth();
  let navigate = useNavigate();

  return (
    <Flex p="16px" bgColor={"blue.400"} w="100%" justifyContent={"center"}>
      <Flex
        w="100%"
        maxW={"container.xl"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Image src={Logo} alt="Logo Plotzer" w="280px" />
        <nav>
          <ButtonGroup colorScheme="teal" size={"md"} spacing="2">
            {authenticated ? (
              <Button onClick={()=>{navigate("/dashboard")}}>Entrar na plataforma</Button>
            ) : (
              <>
                <Button leftIcon={<TbArrowUpRight fontSize={"24px"} />} onClick={()=>{navigate("/login")}}>
                  Login
                </Button>
                <Button onClick={()=>{navigate("/signup")}}>Cadastrar</Button>
              </>
            )}
          </ButtonGroup>
        </nav>
      </Flex>
    </Flex>
  );
}

export default HeaderLanding;
