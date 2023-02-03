import React from "react";
import SlideCard from "./SlideCard";

const SliderHome = (props) => {
    const {
        dots,
        slidesToShow,
        slidesToScroll,
        autoplay,
        appendDots,
        dotsClass,
        customPaging,
        data,
        slideClass,
    } = props;

    return (
        <section className={slideClass}>
            <SlideCard
                dots={dots}
                slidesToShow={slidesToShow}
                slidesToScroll={slidesToScroll}
                autoplay={autoplay}
                // customPaging={customPaging}
                // data={data}
                dotsClass={dotsClass}
            />
        </section>
    );
};

export default SliderHome;
