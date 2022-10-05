import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext'
import { ReactRoutes } from "./routes";

function App() {


  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ReactRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
