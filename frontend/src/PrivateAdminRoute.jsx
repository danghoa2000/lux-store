import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ADMIN_INFO } from "./utils/sessionHelper";

const PrivateAdminRoute = ({ children, roles }) => {
    const adminInfo = JSON.parse(window.sessionStorage.getItem(ADMIN_INFO));
    const roleRequired =
        !!adminInfo && roles.includes(adminInfo.role);
    if (!roleRequired) {
        return <Navigate to="/admin" replace />;
    }
    return children;
};

export default PrivateAdminRoute;
