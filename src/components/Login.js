import React,{useState,useRef} from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validation';
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile } from "firebase/auth";
import {auth} from '../../src/utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
   

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
       const message = checkValidData(email.current.value,password.current.value)
       setErrorMessage(message);

       if(message) return;

       //SignIn SignUp Logic
       if(!isSignInForm) {
        createUserWithEmailAndPassword(
            auth, 
            email.current.value, 
            password.current.value
         )
         .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value, 
                photoURL: "https://www.drawingtutorials101.com/drawing-tutorials/Cartoon-TV/Kick-Buttowski/gunther-magnuson/how-to-draw-Gunther-Magnuson-from-Kick-Buttowski-step-0.png"
              })
              .then(() => {
                const {uid,email,displayName,photoURL} = auth.currentUser;
                dispatch(
                        addUser({
                            uid:uid,
                            email:email,
                            displayName:displayName,
                            photoURL:photoURL
                    })
                    );
                navigate('/browse');
              })
              .catch((error) => {
                setErrorMessage(error.message)
              });
            console.log(user);
            navigate('/browse')
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage)
         })
            //Sign Up Logic
       } else {
            //Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate('/browse')

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
             setErrorMessage(errorCode + "-" + errorMessage)
        });

       }
    }

  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg'
                 alt="logo" />
        </div>
        <form 
        onSubmit={(e) => e.preventDefault()}
        
        className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80' > 
        <h1 className='font-bold text-3xl py-4'>
        {isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && 
            <input 
                   ref={name}
                   type='text' 
                   placeholder='Full Name' 
                   className='p-4 my-4 w-full  bg-gray-600'/> }
            <input 
                   ref={email}
                   type='text' 
                   placeholder='Email Address' 
                   className='p-4 my-4 w-full bg-gray-600'/>
           
            <input 
                   ref={password}
                   type='password' 
                   placeholder='Password' 
                   className='p-4 my-4 w-full  bg-gray-600'/>
            <p className='text-red-500 font-bold text-lg py-2' >{errorMessage}</p>

            <button onClick={handleButtonClick}
                    className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> 
            {isSignInForm ? 
                "New to Netflix? Sign Up Now" 
                :"Already Registered? Sign In Now."}</p>
        </form>
    </div>
  )
}

export default Login;