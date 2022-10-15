import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Shop2 from './Shop2';

function Root() {
    const url = 'https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json';
    const route = createBrowserRouter([
        {
            path: '', element: <Layout />, children: [
                {
                    path: '/', loader: async () => fetch(url), element: <Shop2 />
                },
                { path: 'cart', element: <Cart /> },
                { path: 'order', element: <Order /> },
                { path: 'wish', element: <WishItems /> }
            ]
        }
    ])
    return (
        <div>
            <RouterProvider route={route}></RouterProvider>
        </div>
    )
}

export default Root