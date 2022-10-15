import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import { addToCart, mouseEnter, mouseLeave, handleWish } from '../commonFunctions/functions'
import { CounterContext } from './Layout';
import alt from '../images/img.jpg'
import { useNavigate, useOutletContext } from 'react-router-dom';
function Product(props) {
    const [count, setCount, products, loading, noProduct, setNoProduct, wish, setWish] = useContext(CounterContext);
    const [isWished, setIsWished] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const { img, name, price, ratings, id, ratingsCount } = props?.product;
    const discount = Math.round(Math.random() * (55 - 10) + 10);
    const mainPrice = (parseFloat(price) * 100 / discount).toFixed(0);
    const {user} = useOutletContext();
    let cartButtonText;
    useEffect(() => {
        const wishList = JSON.parse(localStorage.getItem(`${user?.uid}-wished`));
        let wishedItem;
        if (wishList && props) {
            wishedItem = wishList?.find(id => id === props.product.id);
        }
        if (wishedItem) {
            setIsWished(true);
        }
        else {
            setIsWished(false);
        }

    }, [wish]);

    useEffect(() => {
        const amazonStore = JSON.parse(localStorage.getItem(`${user?.uid}-cart`));
        const existInCart = amazonStore?.find(item => item.id === props.product.id);
        if (existInCart) {
            setIsInCart(true);
        }
        else {
            setIsInCart(false);
        }
    }, [count, isInCart])

    if (isInCart) {
        cartButtonText = 'Remove From Cart';
    }
    else {
        cartButtonText = 'Add to Cart';
    }

    function replaceImage(event) {
        event.currentTarget.src = alt;
    }
    const navigate = useNavigate();
    function handleDetails(product) {
        const id = product.id;
        navigate(`../products/${id}`);
    }
    const handleProduct = (type) => {
        if (user?.uid) {
            if (type === 'buy') {
                addToCart(id, price, setCount, user)
            }
            else if (type === 'wish') {
                handleWish(id, setWish, user)
            }
        }
        else {
            navigate('/login')
        }
    }
    return (
        <div className="card bg-base-100 md:h-[450px] xl:h-[460px] shadow-xl" data-aos="fade-up"
            data-aos-anchor-placement="center-bottom">
            <figure>
                <img src={img} onError={replaceImage} onMouseEnter={(event) => mouseEnter(event)} onMouseLeave={(event) => mouseLeave(event)} />
            </figure>
            <div onClick={() => { handleProduct('wish') }}>
                {isWished ? <FontAwesomeIcon className='absolute top-2 right-0 p-4 cursor-pointer text-red-600' icon={faHeart} /> : <FontAwesomeIcon className='absolute top-2 right-0 p-4 cursor-pointer text-gray-600' icon={faHeart} />}
            </div>
            <div className="card-body">
                <h2 className="card-title text-blue-600 text-sm cursor-pointer hover:font-bold" onClick={() => { handleDetails(props?.product) }}>{name.length > 20 ? name.slice(0, 15) + '...' : name}</h2>
                <div className='flex items-center'>
                    <span className='font-bold flex justify-start items-center w-fit px-2 rounded-lg text-white bg-green-500 mr-2'>{ratings} <FontAwesomeIcon className='pl-2 text-xs' icon={faStar} /></span>  <span>({ratingsCount}) </span></div>
                <span className='font-bold text-xl'> ${price}  <span className='font-normal text-sm text-gray-400 line-through'>${mainPrice}</span> <span className='text-green-400 text-sm'>{discount}% off</span></span>
                <div className="card-action">
                    <button className="btn-primary p-2 rounded-md uppercase text-xs font-bold" onClick={() => handleProduct('buy')}>{cartButtonText}</button>
                </div>
            </div>
        </div>
    )
}

export default Product