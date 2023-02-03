import { Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { formatPrice } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants/constants';

const ProductItem = ({ addToCart, shopItems }) => {
    const navigate = useNavigate();
    return (
        <div className='product__list__item'>
            <div className='product mtop'>
                <div className='img'
                    onClick={() => { navigate('/elite/product', { state: { id: shopItems.id } }) }}
                >
                    {shopItems?.sale_persen ? <span className='discount'>{shopItems?.sale_persen}% Off</span> : ""}
                    <img src={BASE_URL + shopItems?.image} alt='' />
                    <div className='product-like'>
                        <label>{0}</label> <br />
                        <i className='fa-regular fa-heart' onClick={() => { }}></i>
                    </div>
                </div>
                <div className='product-details'>
                    <h3 onClick={() => { navigate('/product', { state: { id: shopItems.id } }) }}>{shopItems?.name}</h3>
                    <div className='rate'>
                        <Rating
                            name="text-feedback"
                            value={shopItems?.total_rate || 0}
                            readOnly
                            precision={0.5}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </div>
                    <div className='price'>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            {shopItems?.sale_price ?
                                (
                                    <div>
                                        <span className="old-price">{formatPrice(shopItems?.min_price)}</span>
                                        <span className="new-price" style={{ marginLeft: 5 }}>{formatPrice(shopItems?.min_price - shopItems?.sale_price)}</span>
                                    </div>
                                )
                                :
                                (<span className="new-price">{formatPrice(shopItems?.min_price)}</span>)
                            }
                        </div>
                        {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                        <button onClick={() => addToCart(shopItems)}>
                            <i className='fa fa-plus'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;