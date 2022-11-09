import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api/",
});

const token = localStorage.getItem("token")
if(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`
}

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     return new Promise((resolve, reject) => {
//       try {
//         const accessToken = localStorage.getItem("token");
//         if (
//           err.response.status == 401 &&
//           accessToken &&
//           err.response.data.errors[0].title == "Invalid Token"
//         ) {
//           let a = false;
//           const refresh_token = localStorage.getItem("refresh-token");
//           if (a === false) {
//             a = true;
//             api
//               .post("/auth/refresh-token", {
//                 refresh_token: JSON.parse(refresh_token),
//               })
//               .then((response) => {
//                 console.log(response)
//                 localStorage.setItem(
//                   "refresh-token",
//                   response.data.refresh_token
//                 );
//                 localStorage.setItem("token", response.data.token);
//                 return resolve(response);
//               })
//               .catch((err) => {
//                 console.log(err);
//                 return reject(err);
//               })
//               .finally((res) => {
//                 a = false;
//               });
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }
// );
