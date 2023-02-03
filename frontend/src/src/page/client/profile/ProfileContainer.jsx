import React from "react";
import Profile from "./Profile";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const menu = {
    order: "/elite/profile/order",
    order_detail: "/elite/profile/order/detail",
    profile: "/elite/profile",
    address: "/elite/profile/address",
};
const ProfileContainer = () => {
    const [currentActive, setCurrentActive] = useState(menu["profile"]);
    const navigate = useNavigate();
    useEffect(() => {
        navigate(currentActive);
    }, []);
    return (
        <Profile
            currentActive={currentActive}
            setCurrentActive={setCurrentActive}
        />
    );
};

export default ProfileContainer;
