import {
    Bluetooth,
    Person2,
    Person2Outlined,
    Place,
    PlaceOutlined,
    ShoppingBag,
    ShoppingBagOutlined,
    Wifi,
} from "@mui/icons-material";
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import OrderContainer from "./order/OrderContainer";
import { Outlet, useNavigate } from "react-router-dom";
import { menu } from "./ProfileContainer";

const Profile = ({ currentActive, setCurrentActive }) => {
    const navigate = useNavigate();
    const MENU = useMemo(() => {
        return (
            <div>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                    subheader={<ListSubheader>Dashboard</ListSubheader>}
                    className="light__mode profile__bar"
                >
                    <ListItem
                        className={`${
                            currentActive == menu["order"]
                                ? "profile__bar__item-active"
                                : ""
                        }`}
                        onClick={() => {
                            navigate(menu["order"]);
                            setCurrentActive(menu["order"]);
                        }}
                    >
                        <ListItemIcon>
                            <ShoppingBagOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                </List>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                    subheader={<ListSubheader>Settings</ListSubheader>}
                    className="light__mode profile__bar"
                >
                    <ListItem
                        className={`${
                            currentActive == menu["profile"]
                                ? "profile__bar__item-active"
                                : ""
                        }`}
                        onClick={() => {
                            navigate(menu["profile"]);
                            setCurrentActive(menu["profile"]);
                        }}
                    >
                        <ListItemIcon>
                            <Person2Outlined />
                        </ListItemIcon>
                        <ListItemText primary="Profile info" />
                    </ListItem>
                    <ListItem
                        className={`${
                            currentActive == menu["address"]
                                ? "profile__bar__item-active"
                                : ""
                        }`}
                        onClick={() => {
                            navigate(menu["address"]);
                            setCurrentActive(menu["address"]);
                        }}
                    >
                        <ListItemIcon>
                            <PlaceOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Address" />
                    </ListItem>
                </List>
            </div>
        );
    }, [currentActive]);
    return (
        <section
            className="search py-5"
            style={{
                background: "rgb(246, 249, 252)",
            }}
        >
            <Grid
                container
                sx={{ margin: 0, padding: 1, width: "100%" }}
                spacing={10}
            >
                <Grid item xs={3}>
                    {MENU}
                </Grid>
                <Grid item xs={9}>
                    {/* {
                        currentActive == 1 && (
                            <OrderContainer />
                        )
                    } */}
                    <Outlet />
                </Grid>
            </Grid>
        </section>
    );
};

export default Profile;
