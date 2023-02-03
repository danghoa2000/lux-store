import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ADMIN_INFO, SESSION_ACCESS_TOKEN } from "./utils/sessionHelper";

const PrivateUserRoute = ({ children }) => {
    const _token = window.sessionStorage.getItem(SESSION_ACCESS_TOKEN);
    if (!_token) {
        return <Navigate to="/elite" replace />;
    }
    return children;
};

export default PrivateUserRoute;
