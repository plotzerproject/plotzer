import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../../../components/Base";
import Loading from "../../Loading";
import { api } from "../../../services/api";

function TeamStats() {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const { id_team } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({})
    const [team, setTeam] = useState({})

    async function getTeam() {
        setLoading(true);
        try {
            const teams = await api.get(`/team/${id_team}/members`);
            setTeam(teams.data.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTeam()
    }, [])

    if (loading) {
        return <Loading />
    } else {
        return <Base title={team.attributes.name}>
            asd
        </Base>
    }
}

export default TeamStats