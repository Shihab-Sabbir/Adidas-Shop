import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import WishItem from './WishItem';
function WishItems() {
    const [wishItems, setWishItems] = useState([]);
    const [products, setProducts] = useState([]);
    const {user} = useOutletContext();
    const url = 'https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json';
    useEffect(() => {
        setWishItems(JSON.parse(localStorage.getItem(`${user?.uid}-wished`)));
    }, [user])
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setProducts(
                    json.filter(item => wishItems?.find(wishItem => {
                        return item.id === wishItem;
                    }))
                )
            })
            .catch(err => console.log('error :', err));
    }, [wishItems])

    function handleWish(id) {
        const wishList = JSON.parse(localStorage.getItem(`${user?.uid}-wished`));
        const remaining = wishList.filter(itemId => itemId !== id);
        // localStorage.setItem('amazon-wished', JSON.stringify([...remaining]));
        if (user[0]?.displayName) { localStorage.setItem(`${user?.uid}-wished`, JSON.stringify([...remaining])); }
        setWishItems([...remaining]);
    }

    function addToCart() { };

    if (products.length !== 0)
        return (
            <div className='pt-20 min-h-screen'>
                <div className='grid gap-3 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:max-w-[850px]  xl:max-w-[1200px] mx-auto p-5 pt-20'>
                    {products.map(product => <WishItem product={product} handleWish={handleWish} addToCart={addToCart} key={product.id}></WishItem>)}
                </div>
            </div>
        )
    else {
        return (
            <div className='md:max-w-[850px]  xl:max-w-[1200px] mx-auto p-5 pt-[180px] md:pt-[180px] mb-[19.7%]'>
                <p className='fond-bold text-center'>No Product Found</p>
                <Link to='/'><button className='btn btn-sm w-full mx-auto m-8'>Add Products</button></Link>
            </div>
        )
    }
}

export default WishItems;