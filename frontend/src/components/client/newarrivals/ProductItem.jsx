import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants/constants';

const ProductItem = ({ val }) => {
    const navigate = useNavigate();
    return (
        <div className='box' style={{ margin: "0 5px" }}>
            <div className='img'
                onClick={() => navigate('/elite/product', {
                    state: {
                        id: val.id
                    }
                })}
            >
                {val?.sale_persen != 0 ? <span className='discount'>{val?.sale_persen}% Off</span> : ""}
                <img src={BASE_URL + val?.image} alt='' />
            </div>
            <h4>{val?.name}</h4>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                {val?.sale_price ?
                    (
                        <div>
                            <span className="old-price">{formatPrice(val?.min_price)}</span>
                            <span className="new-price" style={{ marginLeft: 5 }}>{formatPrice(val?.min_price - val?.sale_price)}</span>
                        </div>
                    )
                    :
                    (<span className="new-price">{formatPrice(val?.min_price)}</span>)
                }
            </div>
        </div>
    );
};

export default ProductItem;