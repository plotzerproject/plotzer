import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
  VStack,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import Logo from "../../assets/logo_type.svg";

function StartCreateTeam() {
  let [page, setPage] = useState(0);

  const [nameTeam, setNameTeam] = useState("");
  const [areaTeam, setAreaTeam] = useState("");
  const [descTeam, setDescTeam] = useState("");
  const [privacyTeam, setPrivacyTeam] = useState("");

  const pages = [
    {
      label: "Qual o nome da sua equipe",
      type: "text",
      placeholder: "Insira o nome da equipe",
      value: nameTeam,
      setValue: setNameTeam,
    },
    {
      label: "Qual a área de atuação da sua equipe?",
      type: "text",
      placeholder: "Insira a área de atuação de sua equipe",
      value: areaTeam,
      setValue: setAreaTeam,
    },
    {
      label: "Dê uma descrição para sua equipe",
      type: "textArea",
      placeholder: "Insira uma descrição para sua equipe",
      value: descTeam,
      setValue: setDescTeam,
    },
    {
      label: "Selecione o tipo de privacidade da equipe",
      type: "select",
      placeholder: "Selecione o tipo de privacidade",
      value: privacyTeam,
      setValue: setPrivacyTeam,
    },
  ];

  const [val, setVal] = useState("");
  const handleNextPage = () => {
    if(val != "") {
        console.log(`pagina anterior ${page}`)
        setPage(page++)
        console.log(`nova pagina ${page}`)
        console.log("---")
    } else {
        console.log("nao vai nao")
    }
    };

  return (
    <Flex align="center" justifyContent="center" w="100vw" h="100vh" bgColor={'blue.400'}>
      <Container
        maxW="container.sm"
        centerContent
        bgColor={"white"}
        p={10}
        borderRadius={"8px"}
        height="70vh"
        justifyContent={"center"}
      >
        <VStack spacing={3}>
          <Image src={Logo} alt="Logo Plotzer" />
          <form>
            <FormControl>
              <FormLabel>{pages[page].label}</FormLabel>
              <Input
                type="text"
                size="md"
                placeholder={pages[page].placeholder}
                width="288px"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
            </FormControl>
            <Flex>
              <ButtonGroup gap="2">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  marginTop="20px"
                >
                  Voltar
                </Button>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={()=>handleNextPage()}
                  marginTop="20px"
                  id="btn-next"
                >
                  Próximo
                </Button>
              </ButtonGroup>
            </Flex>
          </form>
        </VStack>
      </Container>
    </Flex>
  );
}
export default StartCreateTeam;
