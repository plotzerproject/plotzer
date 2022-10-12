import { useLocation } from "react-router-dom";

function useQuery(query) {
    return new URLSearchParams(useLocation().search).get(query);
}

export {useQuery}