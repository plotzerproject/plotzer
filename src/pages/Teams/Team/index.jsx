import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../../../components/Base";
import { api } from "../../../services/api";
import Loading from "../../Loading";

function Team() {
  const { id_team } = useParams();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTeam() {
      setLoading(true);
      try {
        const t = await api.get(`/team/${id_team}`);
        console.log(t)
        setTeam(t.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    getTeam();
  }, []);
  if(loading) {
    return <Loading />
  } else {
    return (
        <Base title={team.attributes.name}>
          <Heading> Equipe "{team.attributes.name}"</Heading>
          <Text>é isso :)</Text>
        </Base>
      );
  }
}

export default Team;
