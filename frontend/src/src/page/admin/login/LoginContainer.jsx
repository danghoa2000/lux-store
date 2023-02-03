import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { API_BASE_URL, LOGIN_API } from '../../../../constants/api';
import { useAuth } from '../../../../hooks/useAuth';
import { axiosClient } from '../../../../hooks/useHttp';
import { ADMIN_INFO, ADMIN_SESSION_ACCESS_TOKEN, getAccessToken, saveAccessToken } from '../../../../utils/sessionHelper';
import Login from './Login';

const LoginContainer = () => {
    const { setAuth } = useAuth();
    const [isLoginFailed, setisLoginFailed] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.sessionStorage.getItem(ADMIN_SESSION_ACCESS_TOKEN);
        if (token) {
            navigate("/admin");
        }
    }, [])

    const login = async (data) => {
        await axiosClient.post(LOGIN_API.LOGIN, {
            email: data.email,
            password: data.password,
        },
        ).then(res => {
            setAuth(res.data.info);
            window.sessionStorage.setItem(ADMIN_SESSION_ACCESS_TOKEN, res.data.access_token);
            window.sessionStorage.setItem(ADMIN_INFO, JSON.stringify(res.data.info));
            navigate("/admin");
        }).catch(err => {
            setisLoginFailed({
                status: err.response.data.code,
                message: err.response.data.message
            })
        });
    }

    const handeSubmit = useCallback((data) => {
        login(data)
    }, []);

    return (
        <Login
            isLoginFailed={isLoginFailed}
            handeSubmit={handeSubmit}
        />
    );
};

export default LoginContainer;