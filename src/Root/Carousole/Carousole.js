import React, { useContext } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { CounterContext } from '../Layout';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css'
function Carousole() {
    const [count, setCount, products, loading, noProduct, setNoProduct] = useContext(CounterContext);
    return (
        <div className='!min-w-screen bg-[#ECEFF1] pt-[105px] slider-container mb-[-130px]'>
            <Carousel autoPlay showThumbs={false} showIndicators={false} infiniteLoop interval={2000}>
                {
                    products.map(product =>
                        <div key={product.id} className=' relative md:h-[250px] sm:h-[250px] h-[200px] 2xl:h-[300px]'>
                            <img src={product.img} className='max-w-[40%] md:max-w-[30%]
                            xl:max-w-[28%]
                            absolute bottom-0 lg:top-0 xl:top-[-50px] left-[33%] md:scale-[57%]' />
                        </div>
                    )}
            </Carousel>
        </div>
    )
}

export default Carousole;