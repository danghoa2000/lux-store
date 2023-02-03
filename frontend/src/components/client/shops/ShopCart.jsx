import React, { useState } from "react"
import ProductItem from "./ProductItem"

const ShopCart = ({ shopItems, addToCart }) => {

  return (
    <div>
      {shopItems.map((item, index) => {
        return (
          <ProductItem key={index} shopItems={item} addToCart={addToCart}/>
        )
      })}
    </div>
  )
}

export default ShopCart
