import { BellIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, Divider, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, Text, VStack, Image, AvatarBadge, IconButton } from '@chakra-ui/react'
import Base from '../../components/Base'
import MessageNotFoundImg from "../../assets/team_img_msg_not_found.png";
import InputChat from '../../components/InputChat';

function Chat() {
    return (
        <Base padding={'50px'}>
            <Flex w="100%" h="100%" justifyContent={'space-between'} >
                <VStack w="25%" h="100%">
                    <InputGroup >
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.700' />}
                        />
                        <Input type='tel' placeholder='Pesquisar' borderRadius={'20px'} backgroundColor='gray.200' color='gray.700' />
                    </InputGroup>
                    <Flex flexDirection={'column'} w="100%" h="100%" bgColor={'gray.200'} borderRadius='20px'>
                        <HStack p="16px" w="100%" justify='space-between' borderBottom="1px" borderColor="gray.500">
                            <Heading as={'h2'} fontSize='lg' fontWeight={'semibold'}>Mensagens</Heading>
                            <BellIcon color='gray.700' w={"32px"} h={'32px'} />
                        </HStack>
                        <VStack p="25px 10px 15px 10px" w="100%">
                            <Flex bgColor={'gray.400'} borderRadius='30px' w="100%" h="60px" alignItems={'center'} p="5px">
                                <Avatar
                                    size='md'
                                    name='Jefferson'
                                    // src='https://bit.ly/prosper-baba'
                                />
                                <VStack alignItems={'left'} ml='5px' pos='relative' w="100%" h="100%" justifyContent="center" cursor={'pointer'} onClick={()=>alert("Valores estaticos para testes!")}>
                                    <Heading as={'h4'} fontSize='md' fontWeight={'medium'} color='gray.50' lineHeight={'3'}>Nome do usuário</Heading>
                                    <Text fontSize='sm' fontWeight={'regular'} color='gray.50' overflow={'hidden'} w="100%" lineHeight={'5'} textOverflow={'ellipsis'} >Lorem ipsum dolor sit amet, consec...</Text>
                                    <time style={{ color: "white", position: "absolute", right: "10px", top: "0" }}>12:55</time>
                                </VStack>
                            </Flex>
                            <Flex bgColor={'gray.400'} borderRadius='30px' w="100%" h="60px" alignItems={'center'} p="5px">
                                <Avatar
                                    size='md'
                                    name='Cleiton'
                                    src='https://bit.ly/prosper-baba'
                                />
                                <VStack alignItems={'left'} ml='5px' pos='relative' w="100%" h="100%" justifyContent="center" cursor={'pointer'} onClick={()=>alert("Valores estaticos para testes!")}>
                                    <Heading as={'h4'} fontSize='md' fontWeight={'medium'} color='gray.50' lineHeight={'3'}>Nome do usuário</Heading>
                                    <Text fontSize='sm' fontWeight={'regular'} color='gray.50' overflow={'hidden'} w="100%" lineHeight={'5'} textOverflow={'ellipsis'} >Lorem ipsum dolor sit amet, consec...</Text>
                                    <time style={{ color: "white", position: "absolute", right: "10px", top: "0" }}>12:55</time>
                                </VStack>
                            </Flex>
                            <Flex bgColor={'gray.400'} borderRadius='30px' w="100%" h="60px" alignItems={'center'} p="5px">
                                <Avatar
                                    size='md'
                                    name='Roberto'
                                    // src='https://bit.ly/prosper-baba'
                                />
                                <VStack alignItems={'left'} ml='5px' pos='relative' w="100%" h="100%" justifyContent="center" cursor={'pointer'} onClick={()=>alert("Valores estaticos para testes!")}>
                                    <Heading as={'h4'} fontSize='md' fontWeight={'medium'} color='gray.50' lineHeight={'3'}>Nome do usuário</Heading>
                                    <Text fontSize='sm' fontWeight={'regular'} color='gray.50' overflow={'hidden'} w="100%" lineHeight={'5'} textOverflow={'ellipsis'} >Lorem ipsum dolor sit amet, consec...</Text>
                                    <time style={{ color: "white", position: "absolute", right: "10px", top: "0" }}>12:55</time>
                                </VStack>
                            </Flex>
                        </VStack>
                    </Flex>
                </VStack>
                <Flex w="75%" h="100%" bgColor={'gray.200'} marginLeft='24px' borderRadius={'20px'} align='flex-start' flexDir={'column'}>
                    <HStack w="100%" p="10px 25px" justify={'space-between'} bgColor='gray.300' borderRadius={'20px'} borderBottomRadius='0' borderBottom={'1px'} borderColor='gray.500'>
                        <HStack w="100%">
                            <Avatar
                                size='lg'
                                name='Prosper Otemuyiwa'
                                src='https://bit.ly/prosper-baba'
                            >
                                <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='0.9em' />
                            </Avatar>
                            <Heading as={'h2'} fontSize='lg' fontWeight={'semibold'}>Nome do Usuário</Heading>
                        </HStack>
                        <IconButton
                                aria-label="Editar Anexos"
                                fontSize="24px"
                                color='gray.600'
                                variant={'outline'}
                                // w="24px"
                                // h="24px"
                                onClick={() => {
                                    alert("depois")
                                }}
                                icon={<SearchIcon />}
                            />
                    </HStack>
                    <Flex w="100%" h="100%">
                        <VStack w="100%" h="100%" justify='center' align='center'>
                            <Image src={MessageNotFoundImg} alt="Messages not found" />
                            <Heading fontSize={"lg"} as={"h4"} fontWeight="medium">
                                Nenhuma mensagem encontrada.
                            </Heading>
                            <Text fontSize={"md"} fontWeight="normal">
                                Comece o chat com um "Oi"!
                            </Text>
                        </VStack>
                    </Flex>
                    <Flex w="100%" justify={'center'} p="10px">
                        <InputChat />
                    </Flex>
                </Flex>
            </Flex>
        </Base>
    )
}

export default Chat