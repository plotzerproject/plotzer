import { CircularProgress, Flex, Image } from '@chakra-ui/react'
import Logo from '../../assets/logo_type.svg'

function Loading() {
    return (
        <Flex direction={'column'} w={'100vw'} h='100vh' align='center' justify={'center'}>
        <Image src={Logo} marginBottom="20px"/>
        <CircularProgress isIndeterminate color='green.300' />
        </Flex>
    )
}
export default Loading