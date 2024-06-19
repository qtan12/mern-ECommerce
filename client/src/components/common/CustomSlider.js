import React, { memo } from 'react'
import Slider from 'react-slick';
import {Product} from '../'

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
const CustomSlider = ({product, activedTab, normal}) => {
  return (
    <>
    { product && <Slider {...settings}>

        {product?.map((el, index) => (
            <Product
                key={index} 
                pid={el.id}
                productData= {el}
                isNew={activedTab === 1 ? false : true}
                normal = {normal}
            />
        ))}
    </Slider>}
    </>
  )
}

export default memo(CustomSlider) 