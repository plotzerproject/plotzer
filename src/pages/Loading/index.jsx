import {Flex, Image, Spinner} from '@chakra-ui/react'
import LoadingComponent from '../../components/LoadingComponent'

import Logo from '../../assets/logo_type.svg'

function Loading() {
    return (
        <Flex flexDir={'column'} alignItems='center' justify={'center'}>
            <Image src={Logo} alt="Loading Logo" />
            <LoadingComponent />
        </Flex>
    )
}
export default Loading