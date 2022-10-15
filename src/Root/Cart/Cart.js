import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem';
import './cart.css'
import swal from 'sweetalert';
import { Link, useOutletContext } from 'react-router-dom';
import { CounterContext } from '../Layout';
function Cart() {
    const [products, setProducts] = useState([]);
    const [item, setItem] = useState([]);
    const [allProducts, setAllProducts] = useState([])
    let [productCount, setProductCount] = useState(0)
    const [count, setCount] = useContext(CounterContext);
    const user = useOutletContext();
    const url = 'https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json';
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setAllProducts(json))
            .catch(err => console.log('error :', err));
    }, [user]);
    const amazonStore = JSON.parse(localStorage.getItem(`${user?.uid}-cart`));
    useEffect(() => {
        setProducts(amazonStore);
    }, [item, productCount, user])

    useEffect(() => {
        const cartItemsFullData = allProducts.filter(item => products?.find(product => {
            if (product.id === item.id) {
                item.quantity = product.amount;
            }
            return product.id === item.id
        }));
        setItem(cartItemsFullData);
    }, [allProducts, productCount])

    const handleRemove = (id) => {
        swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
        })
            .then((response) => {
                if (response) {
                    const newProducts = products?.filter(product => product.id !== id);
                    // localStorage.setItem('amazon-cart', JSON.stringify(newProducts));
                    if (user[0]?.displayName) { localStorage.setItem(`${user[0].uid}-cart`, JSON.stringify(newProducts)); }
                    const cartItemsFullData = allProducts.filter(item => newProducts?.find(product => {
                        if (product.id === item.id) {
                            item.quantity = product.amount;
                        }
                        return product.id === item.id
                    }));
                    setItem(cartItemsFullData);
                }
            })
    }
    function handleIncreament(id, quantity) {
        parseInt(quantity);
        quantity = quantity + 1;
        setProductCount(quantity);
        setCount((amazonStore?.reduce((x, y) => x + parseFloat(y.amount), 0) + 1));
        let currentProduct = products.find(item => item.id === id);
        let remainProducts = products.filter(item => item.id !== id);
        currentProduct.amount = quantity;
        // localStorage.setItem('amazon-cart', JSON.stringify([...remainProducts, currentProduct]));
        if (user[0]?.displayName) {
            localStorage.setItem(`${user[0].uid}-cart`, JSON.stringify([...remainProducts, currentProduct]));
        }
    };

    function handleDecreament(id, quantity) {
        parseInt(quantity);
        if (quantity <= 1) {
            setProductCount(1);
        }
        else if (quantity > 1) {
            quantity = quantity - 1;
            setProductCount(quantity);
            setCount((amazonStore?.reduce((x, y) => x + parseFloat(y.amount), 0) - 1));
        }
        let currentProduct = products.find(item => item.id === id);
        let remainProducts = products.filter(item => item.id !== id);
        currentProduct.amount = quantity;
        // localStorage.setItem('amazon-cart', JSON.stringify([...remainProducts, currentProduct]));
        if (user[0]?.displayName) {
            localStorage.setItem(`${user[0].uid}-cart`, JSON.stringify([...remainProducts, currentProduct]));
        }
    }
    const price = products?.reduce((x, y) => x + (parseFloat(y.price) * parseFloat(y.amount)), 0);
    const quantity = products?.reduce((x, y) => x + parseFloat(y.amount), 0);
    const delivery = products?.length * 5;
    const tax = parseFloat((price * 0.1).toFixed(2));
    const total = price + delivery + tax;

    function clearCart() {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this cart items",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            toast: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Cart has been deleted!", {
                        icon: "success",
                    });
                    // localStorage.removeItem('amazon-cart');
                    localStorage.removeItem(`${user[0].uid}-cart`);
                    setProducts([]);
                    setCount(0);
                }
                // else {
                //     swal("Your imaginary file is safe!");
                // }
            });

    }

    if (!products?.length) {
        return (
            <div className='pt-32 min-h-screen'>
                <div className="card bg-base-100">
                    <div className="card-body justify-evenly items-center px-1 h-full relative">
                        <div className='mb-4'>
                            <p className='mt-8'>Cart is Empty</p>
                            <Link to='/'>
                                <button className="btn btn-outline btn-success mt-20">Go Shop</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='pt-16 lg:pt-18 min-h-screen'>
                <div className="bg-base-100 hidden lg:block">
                    <div className="card-body justify-evenly items-center px-1 h-full pt-28">
                        <h2 className="card-title pb-2  absolute left-[25%] top-20 lg:top-[20%]">CART ITEMS</h2>
                        <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                            <div className='px-[5%]'>
                                {
                                    item?.map(item => <CartItem key={item.id} item={item} handleRemove={handleRemove} handleDecreament={handleDecreament} handleIncreament={handleIncreament} ></CartItem>)
                                }
                            </div>
                            <div className='card'>
                                <div className='p-4  md:fixed right-[5%] top-[19%] min-w-[40%] shadow-lg'>
                                    <div className="bg-slate-600 text-white shadow-lg p-4 rounded-md mt-10 max-h-1/2 ">
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>PRODUCT COUNT :</span>
                                            <span className="text-white">
                                                {products?.length || 0}
                                            </span>
                                        </p>
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>TOTAL ITEMS :</span>
                                            <span className="text-white">
                                                {quantity || 0}
                                            </span>
                                        </p>
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>PRICE : </span>
                                            <span className="text-white">
                                                $ {price || 0}
                                            </span>
                                        </p>
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>TAX : </span>
                                            <span className="text-white">
                                                $ {tax || 0}
                                            </span>
                                        </p>
                                        <hr />
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>TOTAL PRICE :</span>
                                            <span className="text-white">
                                                ${total || 0}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <Link to='/order'>
                                            <button className="btn btn-outline btn-success mt-20 mx-2">Order Now</button>
                                        </Link>
                                        <button className="btn btn-outline btn-secondary" onClick={clearCart}>Clear Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content pt-24 md:pt-[100px]">
                        <p className='text-center font-bold uppercase '>cart items</p>
                        <div className='flex flex-col justify-center items-center px-2'>
                            {
                                item?.map(item => <CartItem key={item.id} item={item} handleRemove={handleRemove} handleDecreament={handleDecreament} handleIncreament={handleIncreament} ></CartItem>)
                            }
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content fixed top-0 min-h-screen ">
                            <div className='card'>
                                <div className='p-4  md:fixed right-[5%] top-[12%] min-w-[40%] shadow-lg'>
                                    <label htmlFor="my-drawer-4" className="ml-2 drawer-button btn btn-xs sm:btn-sm m-1 lg:hidden">back</label>
                                    <div className="bg-slate-600 text-white shadow-lg p-4 rounded-md mt-10 max-h-1/2">
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>PRODUCT COUNT :</span>
                                            <span className="text-white">
                                                {products?.length || 0}
                                            </span>
                                        </p>
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>TOTAL ITEMS :</span>
                                            <span className="text-white">
                                                {quantity || 0}
                                            </span>
                                        </p>
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>PRICE : </span>
                                            <span className="text-white">
                                                $ {price || 0}
                                            </span>
                                        </p>
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>TAX : </span>
                                            <span className="text-white">
                                                $ {tax || 0}
                                            </span>
                                        </p>
                                        <hr />
                                        <p className="text-yellow-400 font-semibold flex justify-between items-center">
                                            <span>TOTAL PRICE :</span>
                                            <span className="text-white">
                                                ${total || 0}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <Link to='/order'>
                                            <button className="btn btn-outline btn-success mt-20 mx-2">Order Now</button>
                                        </Link>
                                        <button className="btn btn-outline btn-secondary" onClick={clearCart}>Clear Cart</button>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Cart;