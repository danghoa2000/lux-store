import axios from "axios";
import {
    ADMIN_SESSION_ACCESS_TOKEN,
    getAccessToken,
    SESSION_ACCESS_TOKEN,
} from "../utils/sessionHelper";
import { createBrowserHistory } from "history";

export const axiosClient = axios.create();
const history = createBrowserHistory();

axiosClient.defaults.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

axiosClient.interceptors.request.use(function (config) {
    let token = getAccessToken();
    const paths = history.location.pathname;
    const arrayPaths = paths.split("/");
    if (arrayPaths[1] === "admin") {
        token = window.sessionStorage.getItem(ADMIN_SESSION_ACCESS_TOKEN);
    }
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// axiosClient.interceptors.response.use(
//     function (response) {
//         //Dispatch any action on success
//         return response;
//     },
//     function (error) {
//         if (error.response.data.code === 401) {
//             //Add Logic to
//             //1. Redirect to login page or
//             //2. Request refresh token
//         }
//         return Promise.reject(error);
//     },
//     null,
//     { synchronous: true }
// );

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axios.defaults.withCredentials = false;
