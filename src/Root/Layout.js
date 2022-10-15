import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../Firebase/Firebase.init';
export const CounterContext = createContext();
function Layout() {
    const [user, setuser] = useState({});
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [isReload, setIsReload] = useState(true)
    const [loading, setLoading] = useState(true);
    const [reservedFetch, setReservedFetch] = useState([]);
    const [noProduct, setNoProduct] = useState(false);
    const [wish, setWish] = useState([]);
    const [wishItems, setwishItems] = useState(0)
    const auth = getAuth(app);
    const url = 'https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json';
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => { setProducts(json); setReservedFetch(json); setLoading(false) })
            .catch(err => console.log('error :', err));
    }, []);

    useEffect(() => {
        const cartDb = JSON.parse(localStorage.getItem(`${user?.uid}-cart`));
        setCount(cartDb?.reduce((x, y) => x + parseFloat(y.amount), 0));
        const wishItem = JSON.parse(localStorage.getItem(`${user.uid}-wished`));
        setwishItems(wishItem);
    }, [user, user?.uid, wish])

    useEffect(() => {
        const unsubscribe = () => {
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    currentUser.emailVerified = true;
                    setuser(currentUser);
                    setIsReload(false);
                } else {

                }
            });
        }
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div>
            <Header count={count} user={user} setProducts={setProducts} setNoProduct={setNoProduct} reservedFetch={reservedFetch} wish={wishItems} />
            <CounterContext.Provider value={[count, setCount, products, loading, noProduct, setNoProduct, wish, setWish]}>
                <Outlet context={{ user, setuser, isReload }} />
            </CounterContext.Provider>
            <Footer />
        </div>
    )
}

export default Layout;