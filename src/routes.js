import {
    Routes,
    Route,
    Navigate,
    // Navigate,
} from "react-router-dom";

import Home from './pages/Home'
import MiddlePageSignUp from "./pages/MiddlePageSignUp";
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import StartCreateTeam from "./pages/StartCreateTeam";
import StartJoinTeam from "./pages/StartJoinTeam";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Teams from "./pages/Teams/Teams";
import Chat from "./pages/Chat";
import Methodologies from "./pages/Methodologies";
import Offers from "./pages/Offers";
import { useAuth } from "./hooks/useAuth";
import Profile from "./pages/Profile";
import Team from "./pages/Teams/Team";
import AssignmentSingle from "./pages/Assignment";
import TeamMembers from "./pages/Teams/TeamMembers";
import TeamStats from "./pages/Teams/TeamStats";
import TeamAssignments from "./pages/Teams/TeamAssignments";
import AssignmentAdm from "./pages/Teams/AssigmentAdm";
import TeamRequests from "./pages/Teams/TeamRequests";

// function Private1({ children, auth }) {
//     if (!auth) {
//         return <Navigate to="/login"/>
//     }
//     return children;
// }

export function ReactRoutes() {
    // const {authenticated} = useAuth()

    // useEffect(()=>{
    //     console.log('auth2', isAuthenticated)
    // }, [isAuthenticated])

    const Private = ({ Item }) => {
        const { authenticated } = useAuth();
      
        return authenticated ? <Item /> : <Navigate to="/login"/>
      };

      const SignUpMiddleware = ({ Item }) => {//desconsidera, sao só testes
        const { authenticated } = useAuth();
      
        return authenticated ? <Item /> : <Navigate to="/login"/>
      };

      const VerifyAuth = ({children})=>{
        const {authenticated} = useAuth();

        return authenticated ? <Navigate to="/dashboard" state={{}}/> : children
      }

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/offers" element={<Offers />}/>
                <Route exact path="/signup" element={<VerifyAuth><SignUp /></VerifyAuth>}/>
                <Route exact path="/login" element={<VerifyAuth><LogIn /></VerifyAuth>}/>

                <Route path="/signed" element={<SignUpMiddleware Item={MiddlePageSignUp}/>} />
                {/** fazer pra caso o usuario cadastre-se pasasr por essas paginas, se n elas nem existem!! */}
                <Route path="/start/createteam" element={<SignUpMiddleware Item={StartCreateTeam}/>} />
                <Route path="/start/jointeam" element={<SignUpMiddleware Item={StartJoinTeam}/>} />

                <Route path="/dashboard" element={<Private Item={Dashboard}/>} />
                {/* <Route path="/dashboard" element={<Private1 auth={isAuthenticated}><Dashboard/></Private1>} /> */}
                <Route path="/calendar" element={<Private Item={Calendar}/>} />
                <Route path="/methodologies" element={<Private Item={Methodologies}/>} />
                <Route path="/chat" element={<Private Item={Chat}/>} />
                <Route path="/profile" element={<Private Item={Profile}/>} />
                <Route path="/settings" element={<Private Item={Profile}/>} />

                <Route path="/assignment/:id_assignment" element={<Private Item={AssignmentSingle}/>} />

                <Route path="/teams" element={<Private Item={Teams}/>} />
                <Route path="/teams/:id_team" element={<Private Item={Team}/>} />
                
                <Route path="/teams/:id_team/assignments" element={<Private Item={TeamAssignments}/>} />
                <Route path="/teams/:id_team/assignments/:id_assignment" element={<Private Item={AssignmentAdm}/>} />

                <Route path="/teams/:id_team/members" element={<Private Item={TeamMembers}/>} />
                <Route path="/teams/:id_team/stats" element={<Private Item={TeamStats}/>} />
                <Route path="/teams/:id_team/requests" element={<Private Item={TeamRequests}/>} />

                <Route path="/profile/:id_user" element={<Private Item={Profile}/>} />
            </Routes>
        </>
    )
}