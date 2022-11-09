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
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo_type.svg";

function StartCreateTeam() {
  let [page, setPage] = useState(0);
  const navigate = useNavigate();

  const [nameTeam, setNameTeam] = useState("");
  const [areaTeam, setAreaTeam] = useState("");
  const [descTeam, setDescTeam] = useState("");
  const [privacyTeam, setPrivacyTeam] = useState("");

  useEffect(() => { console.log(nameTeam, areaTeam, descTeam, privacyTeam) }, [nameTeam, areaTeam, descTeam, privacyTeam])

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

  const [step, setStep] = useState(1)
  const getComponentForm = () => {
    switch (step) {
      case 1:
        return <FormControl>
          <FormLabel>{pages[step - 1].label}</FormLabel>
          <Input
            type="text"
            size="md"
            placeholder={pages[step - 1].placeholder}
            width="288px"
            value={nameTeam}
            onChange={(e) => setNameTeam(e.target.value)}
          />
        </FormControl>
      case 2:
        return <FormControl>
          <FormLabel>{pages[step - 1].label}</FormLabel>
          <Input
            type="text"
            size="md"
            placeholder={pages[step - 1].placeholder}
            width="288px"
            value={areaTeam}
            onChange={(e) => setAreaTeam(e.target.value)}
          />
        </FormControl>
      case 3:
        return <FormControl>
          <FormLabel>{pages[step - 1].label}</FormLabel>
          <Input
            type="text"
            size="md"
            placeholder={pages[step - 1].placeholder}
            width="288px"
            value={descTeam}
            onChange={(e) => setDescTeam(e.target.value)}
          />
        </FormControl>
      case 4:
        return <FormControl>
          <FormLabel>{pages[step - 1].label}</FormLabel>
          <Input
            type="text"
            size="md"
            placeholder={pages[step - 1].placeholder}
            width="288px"
            value={privacyTeam}
            onChange={(e) => setPrivacyTeam(e.target.value)}
          />
        </FormControl>
      default:
        setStep(1)
        setNameTeam("")
        setDescTeam("")
        setAreaTeam("")
        setPrivacyTeam("")
        return <FormControl>
          <FormLabel>{pages[step - 1].label}</FormLabel>
          <Input
            type="text"
            size="md"
            placeholder={pages[step - 1].placeholder}
            width="288px"
            value={nameTeam}
            onChange={(e) => setNameTeam(e.target.value)}
          />
        </FormControl>
    }
  }

  async function handleCreateTeam() {

  }

  async function handleNextStep() {
    switch (step) {
      case 1:
        if (nameTeam !== "") {
          step !== 4 && setStep(step + 1)
        } else {
          alert("Falta coisa")
        }
        break;
      case 2:
        if (areaTeam !== "") {
          step !== 4 && setStep(step + 1)
        } else {
          alert("Falta coisa")
        }
        break;
      case 3:
        if (descTeam !== "") {
          step !== 4 && setStep(step + 1)
        } else {
          alert("Falta coisa")
        }
        break;
      case 4:
        if (privacyTeam === "") {
          alert("Falta coisa")
        }
        break;
      default:
        alert("erro")
        break;
    }
  }

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
          <form onSubmit={handleCreateTeam}>

            <VStack>
              {getComponentForm()}
            </VStack>

            <Flex>
              <ButtonGroup gap="2">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  marginTop="20px"
                  onClick={() => step !== 1 ? setStep(step - 1) : navigate("/signed")}
                >
                  Voltar
                </Button>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={handleNextStep}
                  marginTop="20px"
                  id="btn-next"
                  type={step >= 4 ? "submit" : "button"}
                >
                  {step >= 4 ? "Enviar" : "Próximo"}
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
