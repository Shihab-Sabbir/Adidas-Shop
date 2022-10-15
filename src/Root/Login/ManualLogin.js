import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'

function ManualLogin({ setNewUser, setuser, auth }) {
    const [errorMassage, setErrorMassage] = useState('');
    const userEmail = useRef();
    const handleManualSignIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setuser(user);
                setErrorMassage('')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMassage(errorMessage);
            });
    }
    const handleForgetPAssword = () => {
       const email = userEmail.current.value;
        console.log(email)
        email && auth && alert('reset password send')
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMassage('')
            })
            .catch((error) => {
                const errorCode = error.code;
                setErrorMassage(error.message);
            });
    }
    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleManualSignIn}>
                <div className='mb-6'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                        Email
                    </label>
                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" type="email" name="email" id="" ref={userEmail} />
                </div>
                <div className='mb-6'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input required className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    <p className="inline-block align-baseline cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleForgetPAssword}>
                        Forgot Password?
                    </p>
                </div>
                <p className='text-red-500 pt-5'> Error : {errorMassage? errorMassage.split('Firebase: Error (auth/')[1].replace(').', ' .') : ''}</p>
            </form>
            <div className="md:flex md:items-center mb-6">
                <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox" onChange={() => setNewUser(true)} />
                    <span className="text-sm">
                        New User ?
                    </span>
                </label>
            </div>
        </div>
    )
}

export default ManualLogin;