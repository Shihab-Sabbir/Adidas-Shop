function mouseEnter(event) {
    event.currentTarget.style.scale = 1.05;
}
function mouseLeave(event) {
    event.currentTarget.style.scale = 1;
}
function addToCart(id, price, setCount, user) {
    const cartDb = JSON.parse(localStorage.getItem(`${user.uid}-cart`));
    if (cartDb) {
        let isInCart = cartDb.find(item => item.id === id);
        let cartItems = cartDb.filter(item => item.id !== id);
        if (isInCart) {
            // isInCart.amount += 1;
            // cartItems = [...cartItems, isInCart];
            // localStorage.setItem('amazon-cart', JSON.stringify(cartItems));
            localStorage.setItem(`${user.uid}-cart`, JSON.stringify(cartItems));
        }
        else {
            const newItem = { id: id, amount: 1, price: price };
            cartItems = [...cartItems, newItem];
            // localStorage.setItem('amazon-cart', JSON.stringify(cartItems));
            localStorage.setItem(`${user.uid}-cart`, JSON.stringify(cartItems));
        }
    }
    else {
        const newItem = { id: id, amount: 1, price: price };
        // localStorage.setItem('amazon-cart', JSON.stringify([newItem]));
        localStorage.setItem(`${user.uid}-cart`, JSON.stringify([newItem]));
    }
    const cartDbNew = JSON.parse(localStorage.getItem(`${user.uid}-cart`));
    const totalProducts = cartDbNew?.reduce((x, y) => x + parseFloat(y.amount), 0);
    setCount(totalProducts);
}
function quantityUpdate(id, addedProduct, cartProducts) {
    let setCartProducts;
    const cartDb = JSON.parse(localStorage.getItem('amazon-cart'));
    let isInCart = cartDb.find(item => item.id === id);
    if (isInCart) {
        const remainingItem = cartProducts.filter(item => item.id !== id);
        setCartProducts = [...remainingItem, isInCart]
    }
    else {
        addedProduct.amount = 1;
        setCartProducts = [...cartProducts, addedProduct];
    }

    return setCartProducts;
}
function handleWish(id, setWish, user) {
    const wishList = JSON.parse(localStorage.getItem(`${user.uid}-wished`));
    if (wishList) {
        const isExist = wishList?.find(itemId => itemId === id);
        if (isExist) {
            const remaining = wishList?.filter(itemId => itemId !== id);
            // localStorage.setItem('amazon-wished', JSON.stringify([...remaining]));
            localStorage.setItem(`${user.uid}-wished`, JSON.stringify([...remaining]))
            setWish([...remaining, id]);
        }
        else {
            setWish([...wishList, id]);
            // localStorage.setItem('amazon-wished', JSON.stringify([...wishList, id]));
            localStorage.setItem(`${user.uid}-wished`, JSON.stringify([...wishList, id]))
        }
    }
    else {
        setWish([id]);
        // localStorage.setItem('amazon-wished', JSON.stringify([id]));
        localStorage.setItem(`${user.uid}-wished`, JSON.stringify([id]))
    }
}
function findProduct(event, setProducts, reservedFetch, setNoProduct) {
    let search = event.toLowerCase();
    let matched = reservedFetch?.filter(product => (product.name).toLowerCase().includes(search));
    if (search.length === 0 || matched.length === 0) {
        setNoProduct(true);
    }
    else {
        setProducts(matched);
    }
}

function filterByCategory(event, setProducts, reservedFetch) {
    let search = (event.target.innerText);
    let matched = reservedFetch?.filter(product => product.category === search);
    if (search.length === 0 || matched.length === 0 || search === 'All') {
        setProducts(reservedFetch);
    }
    else {
        setProducts(matched);
    }
}
export { mouseEnter, mouseLeave, addToCart, quantityUpdate, handleWish, findProduct, filterByCategory };