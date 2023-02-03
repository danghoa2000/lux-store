import React from "react";
import Categories from "./Categories";
import "./Home.css";
import Sdata from "./Sdata";
import SlideCard from "./SlideCard";

const Home = () => {
    return (
        <section className="home">
            <div className="container d-flex">
                <Categories />
                <SlideCard
                    slideClass={"homeSlide contentWidth"}
                    dots={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={true}
                    data={Sdata}
                    dotsClass={"slick-dots slick-thumb"}
                />
            </div>
        </section>
    );
};

export default Home;
