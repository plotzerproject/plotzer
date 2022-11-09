import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //null | {}
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    // const userLC = localStorage.getItem("user");
    const tokenLC = localStorage.getItem("token");
    // const refreshTokenLC = localStorage.getItem("refresh-token");

    if (tokenLC) {
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(tokenLC)}`;
      async function loginEffect() {
        const response = await api.get("/user/@me")
        const { data } = response
        const userData = {
          id: data.data.id,
          name: data.data.attributes.name,
          email: data.data.attributes.email,
          plan: {
            id: data.data.attributes.plan.id,
            purchaseDate: data.data.attributes.plan.purchaseDate,
            active: data.data.attributes.plan.active,
          },
          applicationPermissions: data.data.attributes.applicationPermissions,
          photo: data.data.attributes.photo,
          background: data.data.attributes.background,
          about: data.data.attributes.about,
          description: data.data.attributes.description
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
      loginEffect()
    } else {
      console.log("tokenlc nao encontrado");
    }
  }, []);

  async function Login(email, password) {
    setLoading(true)
    try {

      //request
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      //destructure data from response
      const { data } = response;

      //create a new Object with the destructure data
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
        photo: data.attributes.photo,
        background: data.attributes.background,
        about: data.attributes.about,
        description: data.attributes.description
      };

      //define the default auth
      api.defaults.headers.common["Authorization"] = `Bearer ${data.tokens.token}`;

      //set values in local storage and state
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(data.tokens.token));
      // localStorage.setItem("refresh-token", JSON.stringify(data.tokens.refresh_token));

      setLoading(false)

    } catch (error) {
      //todo
      setLoading(false)
      console.log('login ', error)
      throw new Error(error)
    }
  }

  async function SignUp(name, email, password, plan) {
    setLoading(true)
    try {
      if (!plan) {
        plan = "63448ed998322542c2f548a0"
      }
      const response = await api.post("/auth/create", {
        name, email, password, plan
      })
      const { data } = response
      
      const userData = {
        id: data.data.id,
        name: data.data.attributes.name,
        email: data.data.attributes.email,
        plan: {
          id: data.data.attributes.plan.id,
          purchaseDate: data.data.attributes.plan.purchaseDate,
          active: data.data.attributes.plan.active,
        },
        applicationPermissions: data.data.attributes.applicationPermissions,
        photo: data.data.attributes.photo,
        background: data.data.attributes.background,
        about: data.data.attributes.about,
        description: data.data.attributes.description
      };

      //define the default auth
      api.defaults.headers.common["Authorization"] = `Bearer ${data.data.tokens.token}`;

      //set values in local storage and state
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(data.data.tokens.token));
      // localStorage.setItem("refresh-token", JSON.stringify(data.tokens.refresh_token));

      setLoading(false)

    } catch (error) {
      //todo
      console.log(error.response.data.errors[0])
      if (error.response.data.errors[0].title === "ERR_USER_EXISTS") {
        throw new Error(error.response.data.errors[0].detail)
      } else {
        throw new Error(error.response.data.errors[0].detail)
      }
    }
  }

  async function Logout() {
    try {
      localStorage.setItem("user", "");
      localStorage.setItem("token", "");
      // localStorage.setItem("refresh-token", "");
      setUser(null);
      api.defaults.headers["Authorization"] = null;
      navigate("/login");
    } catch (error) {
      alert("Ocorreu um erro ao deslogar");
    }
  }


  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(!!user),
        // isAuthenticated,
        user,
        SignUp,
        Login,
        Logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
