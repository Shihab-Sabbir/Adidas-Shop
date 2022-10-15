import React from 'react'
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    return (
        <div className='flex flex-col justify-center items-center pt-[120px]'>
            <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl text-black dark:text-gray-600">
                    <span className="sr-only">Error</span>{error.status || 404}
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">{error.statusText}</p>
                <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
                <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a>
            </div>
        </div>
    );
}

export default ErrorPage;