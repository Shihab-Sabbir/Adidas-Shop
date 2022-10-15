import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Root/ErrorPage';
import Layout from './Root/Layout'
import Shop from './Root/Shop'
import Cart from './Root/Cart/Cart'
import WishItems from './Root/WishItem/WishItems'
import ProductDetails from './Root/ProductDetails/ProductDetails';
import Login from './Root/Login/Login';
import Order from './Root/Order/Order';

function App() {
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Shop /> },
        { path: '/cart', element: <Cart /> },
        { path: '/wish', element: <WishItems /> },
        { path: '/products/:id', element: <ProductDetails /> },
        { path: '/login', element: <Login /> },
        { path: '/order', element: <Order /> }
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App;