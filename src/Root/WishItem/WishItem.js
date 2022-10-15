import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import alt from '../../images/img.jpg'
function WishItem(props) {

    const { img, name, price, ratings, id } = props?.product;
    const discount = Math.round(Math.random() * (55 - 10) + 10);
    const mainPrice = (parseFloat(price) * 100 / discount).toFixed(0);
    function replaceImage(event) {
        event.currentTarget.src = alt;
    }
    function mouseEnter(event) {
        event.currentTarget.style.scale = 1.05;
    }
    function mouseLeave(event) {
        event.currentTarget.style.scale = 1;
    }
    return (
        <div className="card bg-base-100 md:max-h-[400px] shadow-xl" data-aos="fade-up"
            data-aos-anchor-placement="center-bottom">
            <figure>
                <img src={img} onError={replaceImage} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} />
            </figure>
            <div onClick={() => { props.handleWish(id) }}>
                <FontAwesomeIcon className='absolute top-2 right-0 p-4 cursor-pointer text-red-600' icon={faHeart} />
            </div>

            <div className="card-body">
                <h2 className="card-title text-blue-600 text-sm">{name.length > 20 ? name.slice(0, 15) + '...' : name}</h2>
                <div className='font-bold flex justify-start items-center w-fit px-2 rounded-lg text-white bg-green-500'>{ratings} <FontAwesomeIcon className='pl-2 text-xs' icon={faStar} /> </div>
                <span className='font-bold'> ${price}  <span className='font-normal text-gray-400 line-through'>${mainPrice}</span> </span>
                <span>{discount}% off</span>
                <div className="card-action">
                    <button className="btn btn-primary scale-75 absolute right-0 top-[82%]" onClick={() => { props.addToCart(id) }}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default WishItem;
