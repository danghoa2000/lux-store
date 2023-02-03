import React from "react";
import PropTypes from "prop-types";

const Menu = (props) => {
    return (
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
                <span>
                    <i></i>
                </span>
            </a>
        </li>
    );
};

Menu.propTypes = {};

export default Menu;
