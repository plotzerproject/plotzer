import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/api/",
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        return new Promise((resolve, reject) => {
            console.log(err);
            const originalReq = err.config;
            console.log()
            const accessToken = localStorage.getItem("token");
            if (err.response.status == 401 && accessToken && err.response.data.errors[0].title == "Invalid Token") {
                const refresh_token = localStorage.getItem("refresh-token");
                api.post("/auth/refresh-token", {
                    refresh_token
                }).then((response)=>{
                    console.log("response")
                    console.log(response)
                }).catch((err)=>{
                    console.log("err")
                    console.log(err)
                })

            }
        });
    }
);
