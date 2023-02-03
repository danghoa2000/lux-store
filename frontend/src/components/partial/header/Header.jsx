import React from "react";
import "./Header.css";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = ({
    CartItem,
    toggleDrawer,
    setOpen,
    setType,
    setCartItem,
    keySearch,
    setKeySearch,
    isCompleteSetting,
    setComplateSetting
}) => {
    return (
        <div>
            <Search
                CartItem={CartItem}
                toggleDrawer={toggleDrawer}
                setOpen={setOpen}
                setType={setType}
                setCartItem={setCartItem}
                keySearch={keySearch}
                setKeySearch={setKeySearch}
                isCompleteSetting={isCompleteSetting}
                setComplateSetting={setComplateSetting}
            />
            <Navbar />
        </div>
    );
};

export default Header;
