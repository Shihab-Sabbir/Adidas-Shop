import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { faBars, faHeart, faMagnifyingGlass, faUser, faHouse, faPersonWalkingLuggage, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { filterByCategory, findProduct } from '../commonFunctions/functions';
import './App.css'
import logo from '../images/amazon-logo.png'
import logo2 from '../images/amazon-logo2.png'
function Header(props) {
    const [category, setCategory] = useState(['All']);
    const [searchData, setSearchData] = useState('');
    const { setProducts, reservedFetch, setNoProduct, user, wish } = props;
    const navigate = useNavigate();
    const searchField = useRef();
    const location = useLocation();
    let isCartUrl = location.pathname === '/cart';
    useEffect(() => {
        reservedFetch.map(product => {
            const exist = category.find(item => item === product.category);
            if (!exist) {
                setCategory([...category, product.category]);
            }
        });
    }, [category, reservedFetch]);

    function search() {
        if (searchField.current.value === '') {
            setNoProduct(false);
        }
        else {
            navigate('/');
            findProduct(searchData, setProducts, reservedFetch, setNoProduct);
            searchField.current.value = '';
        }
    }
    function handleLogoClick() {
        navigate('/');
        setProducts(reservedFetch);
    }
    const modalLabel = useRef();
    function handleUlClick(event) {
        console.log(event.target)
        if (event.target.nodeName === 'A') { modalLabel.current.click(); }
        // A means li tag element name
    }
    return (
        <div className='md:min-h-[6.5625rem] min-w-full bg-[#131921] fixed z-10 '>
            <div className="navbar bg-[#131921] text-white lg:flex justify-evenly py-0">
                <div className="dropdown dropdown-end pl-3 md:hidden md:static absolute left-2 top-[-0.25rem] cursor-pointer">
                    <label htmlFor="my-modal-3" className="p-3 modal-button">
                        <div className="w-10 rounded-full cursor-pointer">
                            <FontAwesomeIcon icon={faBars} className='text-xl' />
                        </div>
                    </label>
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal duration-400 ease-linear">
                        <div className="min-h-screen bg-white absolute top-0 left-0 w-[75%]">
                            <div className='bg-[#131921] font-bold min-h-[3.5rem] text-center text-white p-2 cursor-auto'>
                                <img src={logo2} className='w-[25%] mx-auto' />
                            </div>
                            <label ref={modalLabel} htmlFor="my-modal-3" className="font-bold absolute right-[1.875rem] top-3 cursor-pointer p-1"><span >✕</span></label>
                            <ul className='text-black grid grid-cols-2 gap-2 pl-[10%]' onClick={handleUlClick}>
                                <li className='mt-4'>
                                    <NavLink to='/'>
                                        <FontAwesomeIcon className='pr-2' icon={faHouse} />
                                        Home
                                    </NavLink>
                                </li>
                                <li className='mt-4'><NavLink to='wish'>
                                    <FontAwesomeIcon className='pr-2' icon={faHeart} />WishList</NavLink>
                                </li>
                                <li className='mt-2'><NavLink to='/order'>
                                    <FontAwesomeIcon className='pr-2' icon={faPersonWalkingLuggage} />Order</NavLink>
                                </li>
                                <li className='mt-2 relative'><NavLink to='cart'>
                                    <FontAwesomeIcon className='pr-2' icon={faCartShopping} />View Cart</NavLink>
                                </li>
                                <li className='mt-2'><NavLink to='/login'>
                                    <FontAwesomeIcon className='pr-2' icon={faUser} />
                                    {user?.uid ? 'Logout' : 'Login'}</NavLink>
                                </li>
                            </ul>
                            <div className='pl-[10%] pt-10 text-black'>
                                <p className='font-bold'>CATEGORIES</p>
                                <ul className=" " onClick={handleUlClick}>
                                    {category.map((item, idx) =>
                                        <li key={idx}
                                            className='hover:font-bold 
                                    h-12  mb-3  pt-3 cursor-pointer text-black' onClick={(event) => filterByCategory(event, setProducts, reservedFetch)}>
                                            <Link to='/'>{item}</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full min-h-[6.375rem] md:min-h-[3.125rem] md:flex-row flex-col justify-between'>
                    <div className='md:static flex absolute top-[.550rem] left-10'>
                        <button className="btn-ghost normal-case text-xl max-w-[3.125rem] md:max-w-[3.75rem] ml-2 md:ml-0" onClick={handleLogoClick}>
                            <img src={logo} className='ml-4  md:mt-1' />
                            {/* main logo */}
                        </button>
                    </div>
                    {/* <div className='min-w-[30%] lg:min-w-[50%] hidden md:flex justify-center'>
                        <ul className='flex justify-center w-full font-bold'>
                            <li className='px-3 hover:text-[#febd69]'><NavLink className={({ isActive }) => (isActive ? "active-link" : "")}
                                to="/"
                                end >Home</NavLink></li>
                          
                            <li className='px-3 hover:text-[#febd69]'><NavLink className={({ isActive }) => (isActive ? "active-link" : "")}
                                to='/order'
                                end >Order</NavLink></li>
                            <li className='px-3 hover:text-[#febd69]'><NavLink to='/login'>{user?.uid ? 'Logout' : 'Login'}</NavLink></li>
                        </ul>
                    </div> */}
                    <div className='flex md:min-w-[60%] min-w-full md:ml-0  md:flex-row flex-col-reverse justify-between items-center'>
                        <div className="md:mt-0  md:static absolute top-14 left-1 pr-[1.625rem] w-[99%] md:w-fit mx-4 text-black lg:ml-[10%] xl:ml-[30%]">
                            <div className="input-group w-full md:w-fit">
                                <input type="text" placeholder="Search" className="input w-full md:w-fit h-[2.5rem]" ref={searchField} onBlur={(event) => (setSearchData(event.target.value))} />
                                <button className=" btn-square bg-[#febd69] text-black border-0 h-[2.5rem]" onClick={search}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                        <div className='ml-[60%] sm:ml-[73%] min-w-fit md:w-full md:ml-[0%] pt-3 md:pt-1 flex flex-row-reverse justify-evenly items-center'>
                            <Link to='/login'>
                                {user?.uid ?
                                    <div className="relative px-3 cursor-pointer">
                                        <img className="w-9 h-9 rounded-full" src={user?.photoURL} />
                                        <span className="top-0 left-10 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                    </div> :
                                    <FontAwesomeIcon title='Login' className=' px-3 text-xl cursor-pointer' icon={faUser} />}
                            </Link>
                            <NavLink className={({ isActive }) => (isActive ? "active-link" : "")}
                                to='/wish'
                                end >
                                <div className='indicator cursor-pointer px-2'>
                                    <FontAwesomeIcon title='View Wish Items' className='text-lg cursor-pointer pt-[12px] md:pt-3 relative' icon={faHeart} />
                                    <span className="badge badge-sm absolute left-5 top-1">
                                        {wish?.length || 0}
                                    </span>
                                </div>
                            </NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "active-link" : "")}
                                to='/order'
                                end >
                                <FontAwesomeIcon title='Order Now' className='text-xl cursor-pointer pt-[.3125rem] md:pt-1 px-2 sm:px-2' icon={faPersonWalkingLuggage} />
                            </NavLink>

                            <label tabIndex={0} className="px-3 pt-[.625rem] " htmlFor="my-drawer-4">
                                <NavLink className={({ isActive }) => (isActive ? "active-link" : "")}
                                    to='/cart'
                                    end >
                                    <div className="indicator cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm indicator-item">
                                            {props.count || 0}
                                        </span>
                                    </div>
                                </NavLink>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md:flex justify-center items-center'>
                <ul className='w-full menu menu-horizontal  bg-[#232f3e] text-white flex justify-center text-center font-bold text-xs' >
                    {category.map((item, idx) => <li key={idx} className='hover:underline 
                    underline-offset-8 decoration-[#febd69] decoration-4 max-h-fit cursor-pointer px-2 lg:px-4 xl:px-6 2xl:px-8' onClick={(event) => filterByCategory(event, setProducts, reservedFetch)}>
                        <Link to='/'>{item}</Link>
                    </li>)}
                </ul>
            </div>

            {
                isCartUrl && <div className="dropdown dropdown-right md:hidden pl-2 p-1">
                    <label htmlFor="my-drawer-4" className="ml-2 drawer-button btn btn-xs sm:btn-sm m-1 lg:hidden">summary</label>
                </div>}


        </div>
    )
}
export default Header;