import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

function InputChat() {
    return (
        <InputGroup
              size="lg"
              w="90%"
              pos={"absolute"}
              left="20px"
              bottom="15px"
            >
              <Input pr="4.5rem" type={"text"} placeholder="Write a message" />
              <InputRightElement width="4.5rem">
                <Button size="lg" colorScheme="teal" h="100%" onClick={()=>alert("next updates")}>
                  Enviar
                </Button>
              </InputRightElement>
            </InputGroup>
    )
}

export default InputChat