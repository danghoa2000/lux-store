import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Ddata from "./Ddata"
import "../newarrivals/style.css"
import { formatPrice } from "../../../utils/helper"
import { useNavigate } from "react-router-dom"

const Dcard = ({ productItems }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <Slider {...settings}>
      {productItems.map((value, index) => {
        return (
          <div className='box' key={index}>
            <div className="product">
              <div className='img has__hover'
                onClick={() => navigate('/elite/product', {
                  state: {
                    id: value.id
                  }
                })}
              >
                {value?.sale_persen ? <span className='discount'>{value?.sale_persen}% Off</span> : ""}
                <img src={value?.image} alt='' />
              </div>
              <h4>{value?.name}</h4>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                {value?.sale_price ?
                  (
                    <div>
                      <span className="old-price">{formatPrice(value?.min_price)}</span>
                      <span className="new-price" style={{ marginLeft: 5 }}>{formatPrice(value?.sale_price)}</span>
                    </div>
                  )
                  :
                  (<span className="new-price">{formatPrice(value?.min_price)}</span>)
                }
              </div>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default Dcard
