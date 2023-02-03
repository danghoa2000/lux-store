import React, { Suspense, useCallback, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ADMIN_SESSION_ACCESS_TOKEN } from "../../utils/sessionHelper";
import Loading from "../../components/partial/Loading";
import axios from "axios";
import { API_BASE_URL, LOGIN_API } from "../../constants/api";
import { useAuth } from "../../hooks/useAuth";
import { axiosClient } from "../../hooks/useHttp";
import { MENU_MAPPING } from "../../constants/constants";
import {
    Collapse,
    Container,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuList,
    Paper,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
    AccountBalance,
    AccountBalanceOutlined,
    AccountTree,
    AccountTreeOutlined,
    BookOnline,
    BrandingWatermarkOutlined,
    Cloud,
    ContentCopy,
    ContentCut,
    ContentPaste,
    Dashboard,
    DashboardOutlined,
    DesktopMacOutlined,
    ExpandLess,
    LocalMallOutlined,
    MotionPhotosAutoOutlined,
    StarBorder,
    VignetteOutlined,
} from "@mui/icons-material";
import "../sass/admin.scss";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
const AdminLayout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(() => {
        const adminToken = window.sessionStorage.getItem(
            ADMIN_SESSION_ACCESS_TOKEN
        );
        if (!adminToken) {
            navigate("/admin/login");
        }
    }, []);

    const redirect = (item) => navigate(item);

    const logout = useCallback(async () => {
        await axiosClient.get(LOGIN_API.LOGOUT);
        setAuth({});
        window.sessionStorage.clear(ADMIN_SESSION_ACCESS_TOKEN);
        navigate("/admin/login");
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </Menu>
    );

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch",
            },
        },
    }));

    const [activeMenu, setActiveMenu] = useState(1);

    return (
        <div>
            <AppBar position="fixed">
                <Container maxWidth="xl" className="admin__header">
                    <Toolbar disableGutters>
                        <div
                            style={{
                                width: 235,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <AdbIcon
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    navigate('/admin/dashboard')
                                }}
                            >
                                LOGO
                            </Typography>
                        </div>

                        <Box sx={{ flexGrow: 1, display: "flex" }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{
                                        "aria-label": "search",
                                    }}
                                />
                            </Search>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                >
                                    <Badge badgeContent={4} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                            {renderMenu}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container
                maxWidth="xl"
                style={{ padding: "0", marginTop: "70px" }}
            >
                <div className="d-flex">
                    <Box className="left__menu">
                        <MenuList>
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(1);
                                    redirect("dashboard");
                                }}
                                className={`${activeMenu == 1 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <DashboardOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Dashboard</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(2);
                                    redirect("account");
                                }}
                                className={`${activeMenu == 2 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <AccountBalanceOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Account</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(3);
                                    redirect("manufacturer");
                                }}
                                className={`${activeMenu == 3 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <AccountTreeOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Manufacturer</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(4);
                                    redirect("group-category");
                                }}
                                className={`${activeMenu == 4 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <MotionPhotosAutoOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Category</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(5);
                                    redirect("categories");
                                }}
                                className={`${activeMenu == 5 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <BrandingWatermarkOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Brand</ListItemText>
                            </MenuItem>
                            {/* <MenuItem onClick={() => redirect('shipping')}>
                                <ListItemIcon>
                                    <BookOnline fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Shipping</ListItemText>
                            </MenuItem> */}
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(6);
                                    redirect("product");
                                }}
                                className={`${activeMenu == 6 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <DesktopMacOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Products</ListItemText>
                            </MenuItem>
                            {/* <MenuItem onClick={() => redirect('event')}>
                                <ListItemIcon>
                                    <BookOnline fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Events</ListItemText>
                            </MenuItem> */}
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(7);
                                    redirect("orders");
                                }}
                                className={`${activeMenu == 7 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <LocalMallOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Orders</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setActiveMenu(8);
                                    redirect("coupon");
                                }}
                                className={`${activeMenu == 8 ? "active" : ""}`}
                            >
                                <ListItemIcon className="mx-2">
                                    <VignetteOutlined fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Coupons</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Box>
                    <Box className="main__content">
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </Box>
                </div>
            </Container>
        </div>
    );
};

export default AdminLayout;
