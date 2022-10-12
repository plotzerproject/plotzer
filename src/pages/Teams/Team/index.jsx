import { Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../../../components/Base'
import { api } from '../../../services/api'

function Team () {
    const {id_team} = useParams()
    console.log(id_team)
    const [team, setTeam] = useState({})

    useEffect(()=>{
        async function getTeam() {
            try {
                const t = await api.get(`/team/${id_team}`)
                setTeam(t.data.data)
                console.log(team)
            } catch (error) {
                
            }
        }
        getTeam()
    }, [])
    return (
        <Base title={team.attributes.name}>
            <Heading> Equipe "{team.attributes.name}"</Heading>
            <Text>é isso :)</Text>
        </Base>
    )
}

export default Team