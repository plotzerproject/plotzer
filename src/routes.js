import {
    Routes,
    Route,
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

export function ReactRoutes() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/plans" element={<Offers />}/>
                <Route exact path="/signup" element={<SignUp />}/>
                <Route exact path="/login" element={<LogIn />}/>

                <Route path="/signed" element={<MiddlePageSignUp/>} />
                {/** fazer pra caso o usuario cadastre-se pasasr por essas paginas, se n elas nem existem!! */}
                <Route path="/start/createteam" element={<StartCreateTeam />} />
                <Route path="/start/jointeam" element={<StartJoinTeam/>} />

                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/calendar" element={<Calendar/>} />
                <Route path="/methodologies" element={<Methodologies/>} />
                <Route path="/chat" element={<Chat/>} />
                <Route path="/teams" element={<Teams/>} />
            </Routes>
        </>
    )
}