import React from "react";

const Catg = ({ brand }) => {
    const data = [
        {
            cateImg: "./images/category/cat-1.png",
            cateName: "Apple",
        },
        {
            cateImg: "./images/category/cat-2.png",
            cateName: "Samasung",
        },
        {
            cateImg: "./images/category/cat-1.png",
            cateName: "Oppo",
        },
        {
            cateImg: "./images/category/cat-2.png",
            cateName: "Vivo",
        },
        {
            cateImg: "./images/category/cat-1.png",
            cateName: "Redimi",
        },
        {
            cateImg: "./images/category/cat-2.png",
            cateName: "Sony",
        },
    ];
    return (
        <div className="category">
            <div className="chead d-flex">
                <h1 style={{ flex: "1" }}>Brands </h1>
                <h1 style={{ flex: "1" }}>Shops </h1>
            </div>
            {Object.keys(brand).length > 0 &&
                brand.map((value, index) => {
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
                        <div className="box" key={index}>
                            <img src={data[i].cateImg} alt="" />
                            <span>{value.name}</span>
                        </div>
                    );
                })}
            <div className="box box2">
                <button>View All Brands</button>
            </div>
        </div>
    );
};

export default Catg;
