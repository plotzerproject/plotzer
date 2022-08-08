import {
    Routes,
    Route,
    // Navigate,
} from "react-router-dom";

import Home from './pages/Home'
import MiddlePageSignUp from "./pages/MiddlePageSignUp";
import SignUp from './pages/SignUp'

export function ReactRoutes() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/signup" element={<SignUp />}/>

                <Route path="/signed" element={<MiddlePageSignUp/>} />
            </Routes>
        </>
    )
}