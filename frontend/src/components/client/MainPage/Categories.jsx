import React, { useCallback, useEffect, useState } from "react";
import { GROUP_CATEGORY_API } from "../../../constants/api";
import { axiosClient } from "../../../hooks/useHttp";
import { BASE_URL, CODE } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const getCategory = useCallback(() => {
        axiosClient
            .get(GROUP_CATEGORY_API.LIST)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setCategory(response.data.groupCategories);
                }
            })
            .catch((response) => {
                // setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                // setShowNoti(true)
            });
    }, []);

    useEffect(() => {
        getCategory();
    }, []);

    const data = [
        {
            cateImg: "./images/category/cat1.png",
            cateName: "Fashion",
        },
        {
            cateImg: "./images/category/cat2.png",
            cateName: "Electronic",
        },
        {
            cateImg: "./images/category/cat3.png",
            cateName: "Cars",
        },
        {
            cateImg: "./images/category/cat4.png",
            cateName: "Home & Garden",
        },
        {
            cateImg: "./images/category/cat5.png",
            cateName: "Gifts",
        },
        {
            cateImg: "./images/category/cat6.png",
            cateName: "Music",
        },
        {
            cateImg: "./images/category/cat7.png",
            cateName: "Health & Beauty",
        },
        {
            cateImg: "./images/category/cat8.png",
            cateName: "Pets",
        },
        {
            cateImg: "./images/category/cat9.png",
            cateName: "Baby Toys",
        },
        {
            cateImg: "./images/category/cat10.png",
            cateName: "Groceries",
        },
        {
            cateImg: "./images/category/cat11.png",
            cateName: "Books",
        },
    ];

    return (
        <div className="category">
            {Object.keys(category).length > 0 &&
                Object.values(category).map((value, index) => {
                    let i = 0;
                    if (index !== 0) {
                        let intNumber = index / data.length;
                        if (intNumber !== 0) {
                            const surplus = index % data.length;
                            i = surplus;
                        } else {
                            i = index;
                        }
                    }
                    return (
                        <div
                            className="box d-flex"
                            style={{ alignItems: "center" }}
                            key={index}
                            onClick={() =>
                                navigate("/elite/search", {
                                    state: {
                                        group_category_id: value.id,
                                    },
                                })
                            }
                        >
                            <img src={BASE_URL + data[i].cateImg} alt="" />
                            <span>{value.name}</span>
                        </div>
                    );
                })}
        </div>
    );
};

export default Categories;
