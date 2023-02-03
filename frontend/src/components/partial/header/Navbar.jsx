import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    // Toogle Menu
    const [MobileMenu, setMobileMenu] = useState(false);
    return (
        <header className="header">
            <div className="container d-flex justify-content-between">
                <div className="catgrories d-flex">
                    <span className="fa-solid fa-border-all"></span>
                    <h4>Categories</h4>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
