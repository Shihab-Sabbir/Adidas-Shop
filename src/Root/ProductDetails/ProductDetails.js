import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CounterContext } from '../Layout';
import { addToCart, handleWish } from '../../commonFunctions/functions'
function ProductDetails() {
    const [productData, setProductData] = useState({
        img: '', name: '', price: '', ratings: '', ratingsCount: '', category: '', seller: ''
    });
    const [isInCart, setIsInCart] = useState(false);
    const [isInWish, setIsInWish] = useState(false);
    const [count, setCount, products, loading, noProduct, setNoProduct, wish, setWish] = useContext(CounterContext);
    const location = useLocation();
    const splitUrl = location.pathname.split('/');
    const id = splitUrl[splitUrl.length - 1];
    const navigate = useNavigate();
    let product;
    if (products) {
        product = products.find(product => product.id === id);
    }
    useEffect(() => {
        setProductData({
            img: product?.img,
            name: product?.name,
            price: product?.price,
            ratings: product?.ratings,
            ratingsCount: product?.ratingsCount,
            category: product?.category,
            seller: product?.seller,
        });
    }, [product]);

    let wishButtonText;
    let cartButtonText;

    useEffect(() => {
        const wishList = JSON.parse(localStorage.getItem('amazon-wished'));
        const amazonStore = JSON.parse(localStorage.getItem('amazon-cart'));
        const existInWish = wishList.find(item => item === id);
        const existInCart = amazonStore.find(item => item.id === id);
        existInWish ? setIsInWish(true) : setIsInWish(false);
        existInCart ? setIsInCart(true) : setIsInCart(false);
    }, [count, wish])

    if (isInCart) {
        cartButtonText = 'Remove From Cart';
    }
    else {
        cartButtonText = 'Add to Cart';
    }
    if (isInWish) {
        wishButtonText = 'Remove From Wish List';
    }
    else {
        wishButtonText = 'Add to WishList';
    }
    return (
        <div>
            <div className='flex p-5 pt-40'>
                <div>
                    <img src={productData.img} className='w-80' />
                </div>
                <div className='pl-2 flex flex-col justify-between'>
                    {productData.name}
                    <br />
                    {productData.price}
                    <br />
                    {productData.ratings}
                    <br />
                    {productData.ratingsCount}
                    <br />
                    {productData.category}
                    <br />
                    <div className='flex flex-col'>
                        <button className="btn btn-outline btn-success mb-2" onClick={() => handleWish(id, setWish)}>{wishButtonText}</button>
                        <button className="btn btn-outline btn-warning" onClick={() => addToCart(id, productData?.price, setCount)}>{cartButtonText}</button>
                    </div>
                </div>
            </div>
            <button className="btn btn-outline btn-error m-2 ml-5" onClick={() => { navigate(-1) }}>Back</button>
        </div>
    )
}

export default ProductDetails;