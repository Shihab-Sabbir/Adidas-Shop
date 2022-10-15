import React, { useEffect, useState } from 'react'
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/Firebase.init';
import icon from './assets/icon';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ManualLogin from './ManualLogin';
import ManualSignup from './ManualSignup';
function Login() {
    const auth = getAuth(app);
    const providerGoggle = new GoogleAuthProvider();
    const providerGitHub = new GithubAuthProvider();
    const providerFb = new FacebookAuthProvider();
    const { user, setuser, isReload } = useOutletContext();
    let [icons, setIcons] = useState('');
    const [newUser, setNewUser] = useState(false)
    const [isVerified, setIsVerified] = useState(false);
    const handleAuthentication = (provider) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                setuser(user);
                setIsVerified(true);
            }).catch((error) => {
                console.log(error)
            });
    }
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setuser({});
        }).catch((error) => {
            console.log(error)
        });
    }
    const navigate = useNavigate();
    const verify = () => {
        window.alert('verification code send to your email ,please check inbox or spam')
        sendEmailVerification(auth.currentUser)
            .then(() => {
                let interval = setInterval(async () => {
                    if (user.emailVerified) {
                        clearInterval(interval);
                        navigate("/login");
                        setIsVerified(true);
                        console.log('IsVerified', isVerified, 'user ', user)
                    }
                    await user.reload();
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
                setIsVerified(false)
            });
    }
    useEffect(() => {
        console.log(user)
        let providers;
        if (user.displayName) {
            providers = user?.providerData[0]?.providerId;
        }
        if (providers && providers === 'google.com') { setIcons(icon.googleIcon); setIsVerified(true); }
        else if (providers && providers === 'github.com') { setIcons(icon.gitIcon); setIsVerified(true); }
        else if (providers && providers === 'facebook.com') { setIcons(icon.fbIcon); setIsVerified(true); }
    }, [user])
    if (isReload) { return (<p className='text-center pt-[10%] min-h-screen'>Loading...</p>) }
    else {
        return (
            <div className='pt-[110px] flex flex-col justify-start items-center min-h-screen'>
                {!user?.displayName && <p className='text-center font-bold text-sky-500 text-lg uppercase'>Please Login first</p>}
                {user?.displayName &&
                    <div className="flex items-center space-x-4 pb-10 pt-12">
                        <img className="w-10 h-10 rounded-full" src={user?.photoURL} />
                        <div className="font-medium dark:text-white">
                            <div>{user?.displayName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {user?.metadata?.creationTime}</div>
                            {isVerified === true ? <small className='text-blue-600'>Your verified account</small> : <small className='text-black'>Please <span className='text-blue-600 cursor-pointer' onClick={verify}>verify</span> your account.</small>}
                        </div>
                    </div>}
                {user.displayName ?
                    <div>
                        <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2" onClick={handleSignOut}>
                            {icons}
                            Sign out
                        </button>
                    </div> :
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="flex md:flex-row flex-col rounded-box justify-center items-center pt-10">
                            <button type="button" className="w-[200px] text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2" onClick={() => handleAuthentication(providerGoggle)}>
                                {icon.googleIcon}
                                Sign in with Google
                            </button>
                            <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2" onClick={() => handleAuthentication(providerFb)}>
                                {icon.fbIcon}
                                Sign in with Facebook
                            </button>
                            <button type="button" className="w-[200px] text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2" onClick={() => handleAuthentication(providerGitHub)}>
                                {icon.gitIcon}
                                Sign in with Github
                            </button>
                        </div>
                        <div className="divider">OR</div>
                        <div className="grid h-fit card rounded-box place-items-center">
                            {
                                newUser ?
                                    <ManualSignup auth={auth} setNewUser={setNewUser} setuser={setuser} />
                                    :
                                    <ManualLogin auth={auth} setNewUser={setNewUser} setuser={setuser} />
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default Login;