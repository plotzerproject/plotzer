import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

function AssignmentSingle() {
    const { id_assignment } = useParams();
    const [assigment, setAssignment] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    console.log(id_assignment)

    useEffect(()=>{
        async function getAssignment() {
            try {
                
            } catch (error) {
                
            }
        }

        getAssignment()
    })

    if (loading) {
        return <Loading />;
    } else {
    }
}

export default AssignmentSingle;
