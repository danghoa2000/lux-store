import {
    Add,
    AddCircle,
    Clear,
    Delete,
    Inbox,
    Logout,
    Person2,
    Remove,
    ShoppingCart,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Dialog,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchField } from "../../../hooks/useSearchField";
import { useAuth } from "../../../hooks/useAuth";
import { axiosClient } from "../../../hooks/useHttp";
import { LOGIN_API } from "../../../constants/api";
import { CODE } from "../../../constants/constants";
import {
    CUSTOMER_INFO,
    SESSION_ACCESS_TOKEN,
} from "../../../utils/sessionHelper";

const Search = ({
    CartItem,
    toggleDrawer,
    setOpen,
    setType,
    setCartItem,
    keySearch,
    setKeySearch,
    isCompleteSetting,
    setComplateSetting,
}) => {
    const { searchField, setSearchFiled } = useSearchField();
    const [isLogin, setLogin] = useState(false);
    const { user, setUser } = useAuth();
    const [name, setName] = useState("");
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();
    // fixed Header
    useEffect(() => {
        window.addEventListener("scroll", function () {
            const search = document.querySelector(".search");
            search.classList.toggle("active", window.scrollY > 100);
        });
    }, []);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [user]);

    const handleSearch = useCallback(() => {
        navigate("search");
        setComplateSetting((pre) => !pre);
    }, [name]);

    const logout = () => {
        axiosClient
            .post(LOGIN_API.LOGOUT, {
                isCustomer: true,
            })
            .then((res) => {
                if (res.data.code == CODE.HTTP_OK) {
                    setUser({});
                    window.sessionStorage.clear(SESSION_ACCESS_TOKEN);
                    window.sessionStorage.clear(CUSTOMER_INFO);
                    setCartItem([]);
                }
            })
            .catch((err) => {});
    };

    return (
        <section className="search">
            <div className="container d-flex align-items-center justifycontent-space-between">
                <div className="logo width " onClick={() => navigate("/elite")}>
                    <img
                        src={
                            "https://bonik-react.vercel.app/assets/images/logo.svg"
                        }
                        alt=""
                    />
                </div>

                <div className="search-box f_flex">
                    <i
                        className="fa fa-search"
                        style={{ cursor: "pointer" }}
                        onClick={handleSearch}
                    ></i>
                    <input
                        type="text"
                        placeholder="Search and hit enter..."
                        value={keySearch}
                        onChange={(e) => setKeySearch(e.target.value)}
                        onBlur={(e) => {
                            setKeySearch(
                                e.target.value ? e.target.value.trim() : ""
                            );
                        }}
                    />
                    <span>All Category</span>
                </div>

                <div className="icon f_flex width">
                    {isLogin ? (
                        <div>
                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar className="avatar__header">
                                        {user?.info?.full_name
                                            ? user?.info?.full_name.split("")[0]
                                            : ""}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    className="light__mode"
                                >
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                logout();
                                            }}
                                            key={"logout"}
                                        >
                                            <ListItemIcon>
                                                <Logout />
                                            </ListItemIcon>
                                            <ListItemText primary={"Logout"} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate("/elite/profile");
                                                handleCloseUserMenu();
                                            }}
                                            key={"profile"}
                                        >
                                            <ListItemIcon>
                                                <Person2 />
                                            </ListItemIcon>
                                            <ListItemText primary={"Profile"} />
                                        </ListItemButton>
                                    </ListItem>
                                </Menu>
                            </Box>
                        </div>
                    ) : (
                        <i
                            className="fa fa-user icon-circle"
                            onClick={() => {
                                setOpen(true);
                                setType(2);
                            }}
                        ></i>
                    )}
                    <div className="cart" onClick={toggleDrawer(true)}>
                        <i className="fa fa-shopping-bag icon-circle"></i>
                        {CartItem.length === 0 ? (
                            ""
                        ) : (
                            <span>{CartItem.length}</span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Search;
