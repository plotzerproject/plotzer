import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //null | {}
  // const [token, setToken] = useState(null); //null | {}
  // const [refreshToken, setRefreshToken] = useState(null); //null | {}
  // const [loading, setLoading] = useState(true)
  let navigate = useNavigate();

  useEffect(() => {
    const userLC = localStorage.getItem("user");
    const tokenLC = localStorage.getItem("token");
    const refreshTokenLC = localStorage.getItem("refresh-token");

    if (userLC) {
      if (tokenLC) {
        if (refreshTokenLC) {
          // setToken(JSON.parse(tokenLC));
          // setRefreshToken(JSON.parse(refreshTokenLC));
          setUser(JSON.parse(userLC));

          api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(tokenLC)}`;
          // console.log(api.defaults.headers["Authorization"])
        } else {
          console.log("reflc nao encontrado");
        }
      } else {
        console.log("tokenlc nao encontrado");
      }
    } else {
      console.log("userlc nao encontrado");
    }
  }, []);

  async function Login(email, password) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    const { data } = response;
    const userData = {
      id: data.id,
      name: data.attributes.name,
      email: data.attributes.email,
      plan: {
        id: data.attributes.plan.id,
        purchaseDate: data.attributes.plan.purchaseDate,
        active: data.attributes.plan.active,
      },
      applicationPermissions: data.attributes.applicationPermissions,
    };
    setUser(userData);
    // setToken(data.tokens.token);
    // setRefreshToken(data.tokens.refresh_token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", JSON.stringify(data.tokens.token));
    localStorage.setItem(
      "refresh-token",
      JSON.stringify(data.tokens.refresh_token)
    );
    console.log(data.tokens.token)
    api.defaults.headers.common["Authorization"] = `Bearer ${data.tokens.token}`;
    navigate("/dashboard", { replace: true });
  }

  async function logout() {
    try {
      localStorage.setItem("user", "");
      localStorage.setItem("token", "");
      localStorage.setItem("refresh-token", "");
      setUser(null);
      // setToken(null);
      // setRefreshToken(null);
      api.defaults.headers["Authorization"] = null;
      navigate("/login", { replace: true });
    } catch (error) {
      alert("Ocorreu um erro ao deslogar");
    }
  }

  async function handleSignUp(formData) {}

  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(user),
        user,
        Login,
        logout,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
