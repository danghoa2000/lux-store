import React from "react";

import Home from "../../../components/client/MainPage/Home";
import FlashDeals from "../../../components/client/flashDeals/FlashDeals";
import TopCate from "../../../components/client/top/TopCate";
import NewArrivals from "../../../components/client/newarrivals/NewArrivals";
import Discount from "../../../components/client/discount/Discount";
import Shop from "../../../components/client/shops/Shop";
import Annocument from "../../../components/client/annocument/Annocument";
import Wrapper from "../../../components/client/wrapper/Wrapper";
import TopRate from "../../../components/client/topRate/TopRate";
import TemporaryDrawer from "../../../components/partial/TemporaryDrawer";

const HomePage = ({
    productItems,
    addToCart,
    CartItem,
    shopItems,
    flashDelas,
    newArrivals,
    bigDiscounts,
    ortherProduct,
    topRateProduct,
    topGroupCategory,
    brand,
    status,
    showNoti,
}) => {
    return (
        <div>
            <Home CartItem={CartItem} ></Home>
            <FlashDeals productItems={flashDelas} addToCart={addToCart} />
            <section className="background">
                <div
                    className="container"
                    style={{ display: "flex", flexWrap: "wrap" }}
                >
                    <div style={{ width: "100%" }}>
                        <TopCate topGroupCategory={topGroupCategory} />
                    </div>
                </div>
            </section>
            <section className="background">
                <div
                    className="container"
                    style={{ display: "flex", flexWrap: "wrap" }}
                >
                    <div style={{ width: "100%" }}>
                        <TopRate topRateProduct={topRateProduct} />
                    </div>
                </div>
            </section>
            <NewArrivals productItems={newArrivals} />
            {/* <Discount productItems={bigDiscounts} /> */}
            <Shop
                shopItems={ortherProduct}
                addToCart={addToCart}
                brand={brand}
            />
            <Annocument />
            <Wrapper />
        </div>
    );
};

export default HomePage;
