import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'

function ManualLogin({ setNewUser, setuser, auth }) {
    const [errorMessage, setErrorMessage] = useState('');
    const handleManualSignUp = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const photoUrl = URL.createObjectURL(event.target.photoUrl.files[0]);
        createUserWithEmailAndPassword(auth, email, password, photoUrl)
            .then((userCredential) => {
                const user = userCredential.user;
                setErrorMessage('');
                updateProfile(auth.currentUser, {
                    displayName: username,
                    photoURL: photoUrl,
                }).then(() => {
                    setuser(user);
                    setErrorMessage('');
                }).catch((error) => {
                    setErrorMessage(error.message);
                });
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }
    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleManualSignUp}>
                <div className='mb-6'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        User Name
                    </label>
                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="username" type="text" name="username" id="" />
                </div>
                <div className='mb-6'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoUrl">
                        User Name
                    </label>
                    <input required accept="image/*" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="user image" type="file" name="photoUrl" id="" />
                </div>
                <div className='mb-6'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                        Email
                    </label>
                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" type="email" name="email" id="" />
                </div>
                <div className='mb-6'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input required className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                </div>
                <p className='pt-5'>
                    <small className='text-red-500'>{errorMessage}</small>
                </p>
            </form>
            <div className="md:flex md:items-center mb-6">
                <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" checked type="checkbox" onChange={() => setNewUser(false)} />
                    <span className="text-sm">
                        New User ?
                    </span>
                </label>
            </div>
        </div>
    )
}

export default ManualLogin;