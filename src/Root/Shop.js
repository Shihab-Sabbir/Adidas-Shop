import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Carousole from './Carousole/Carousole';
import { CounterContext } from './Layout';
import Loader from './Loader/Loader';
import Product from './Product';

function Shop() {
    const [count, setCount, products, loading, noProduct, setNoProduct] = useContext(CounterContext);
    const navigate = useNavigate();
    const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function handleClick() {
        navigate(-1);
        setNoProduct(false);
    }
    
    if (noProduct === false) return (
        <div>
            <Carousole />
            <div className='grid gap-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:max-w-[850px]  xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto p-5 pt-[160px] md:pt-[140px]'>
                {loading ? dummyArray?.map((idx) => <Loader key={idx} />) :
                    products?.map(product => <Product product={product} key={product.id}></Product>)}
            </div>
        </div>
    )
    else {
        return (
            <div className='md:max-w-[850px]  xl:max-w-[1200px] mx-auto p-5 pt-[180px] md:pt-[180px] mb-[19.7%]'>
                <p className='fond-bold text-center'>No Product Found</p>
                <button onClick={handleClick}>Back</button>
            </div>
        )
    }

}
export default Shop;