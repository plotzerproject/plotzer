import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderLanding from "../../components/Header/landing";
import { api } from "../../services/api";
import Loading from "../Loading";

const { Flex, Text, Heading } = require("@chakra-ui/react");

function Offers() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        async function getPlans(){
            setLoading(true)
            const a = await api.get("/plan")
            setPlans(a.data.data)
            setLoading(false)
        }
        getPlans()
    }, [])
    return (
        <Flex bgColor={'gray.50'} flexDir='column'>
            <HeaderLanding></HeaderLanding>
            <Flex bgColor={'gray.100'} justifyContent='center'>
                {loading && <Loading />}
                <Flex >
                {plans !== [] && plans.map((plan, indice)=>{
                    return <Flex key={indice} border='1px'>
                        <Heading>{plan.attributes.name}</Heading>
                        <Text>R$ {plan.attributes.price}</Text>
                        <Link to={`/signup?plan=${plan.id}`}>Selecionar</Link>
                    </Flex>
                })}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Offers