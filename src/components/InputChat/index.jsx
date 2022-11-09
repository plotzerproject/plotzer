import { ChevronRightIcon } from "@chakra-ui/icons"
import { Button, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

function InputChat({ position, height, width }) {

  const borderRadius = "30px"

  // position: {
  //   pos: "",
  //   left: "",
  //   bottom: "",
  //   right: "",
  //   top: ""
  // }

  return (
    <InputGroup
      size="lg"
      w={width ? width : "100%"}
      pos={position && position.pos !== "" ? position.pos : undefined}
      left={position && position.left !== "" ? position.left : undefined}
      bottom={position && position.bottom !== "" ? position.bottom : undefined}
      top={position && position.top !== "" ? position.top : undefined}
      right={position && position.right !== "" ? position.right : undefined}

      // pos={"absolute"}
      // left="20px"
      // bottom="15px"
      h={height}
      pr="0"
      bgColor={'gray.300'}
      borderRadius={borderRadius}
    >
      <Input type={"text"} placeholder="Write a message" borderRadius={borderRadius} color='gray.800'/>
      <InputRightElement>
        <IconButton
          colorScheme='teal'
          aria-label='Call Segun'
          size='lg'
          fontSize={'32px'}
          borderRadius={borderRadius}
          icon={<ChevronRightIcon />}
          onClick={()=>alert("next updates")}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default InputChat