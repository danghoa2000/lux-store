import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LOGIN_API } from "../../../../constants/api";
import { useAuth } from "../../../../hooks/useAuth";
import { axiosClient } from "../../../../hooks/useHttp";
import {
    SESSION_ACCESS_TOKEN,
    CUSTOMER_INFO,
} from "../../../../utils/sessionHelper";
import Login from "./Login";

const LoginContainer = () => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isLoginFailed, setisLoginFailed] = useState({});
    const navigate = useNavigate();

    const login = (data) => {
        setLoading(true);
        axiosClient
            .post(LOGIN_API.LOGIN, {
                email: data.email,
                password: data.password,
                isCustomer: true,
            })
            .then((res) => {
                setUser(res.data.info);
                window.sessionStorage.setItem(
                    SESSION_ACCESS_TOKEN,
                    res.data.access_token
                );
                window.sessionStorage.setItem(
                    CUSTOMER_INFO,
                    JSON.stringify(res.data.info)
                );
                navigate("/elite");
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                // setisLoginFailed({
                //     status: err.response.data.code,
                //     message: err.response.data.message
                // })
            });
    };

    const handeSubmit = useCallback((data) => {
        login(data);
    }, []);

    useEffect(() => {
        const token = window.sessionStorage.getItem(SESSION_ACCESS_TOKEN);
        if (token) {
            navigate("/elite");
        }
    }, []);

    return (
        <Login
            loading={loading}
            isLoginFailed={isLoginFailed}
            handeSubmit={handeSubmit}
        />
    );
};

export default LoginContainer;
