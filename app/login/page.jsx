'use client'

import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
// import upload from '../lib/upload';

function Login() {

    const [avatar, setAvatar] = useState({ file: null, url: '' });
    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [username, setUsername] = useState(''); // Track username input
    const [usernameAvailable, setUsernameAvailable] = useState(null); // Check if username is available
    const [checkingUsername, setCheckingUsername] = useState(false); // Show loading while checking
    const [createAccountAvailable, setCreateAccountAvailable] = useState(true);

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoginError(false);
        } catch (error) {
            setLoginErrorMessage(error.message);
            setLoginError(true);
        } finally {
            setLoading(false);
        }
    };

    const sendPasswordReset = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email } = Object.fromEntries(formData);
        await sendPasswordResetEmail(auth, email).then(() => {
            alert('Password Reset Email Sent!');
            setForgotPassword(false);
        }).catch(error => {
            alert(error.message);
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!usernameAvailable) return; // Prevent submission if username is taken

        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            let imgUrl = '';
            if (avatar.file) {
                // TODO: upload file to storage
                // imgUrl = await upload(avatar.file);
            }

            // TODO: make db entry with username email and avatar

            setRegisterSuccess(true);
            setRegisterError(false);
        } catch (error) {
            setRegisterErrorMessage(error.message);
            setRegisterError(true);
        } finally {
            setLoading(false);
        }
    };

    // Debounced username availability check
    useEffect(() => {
        if (username.trim() === '') {
            setUsernameAvailable(null);
            return;
        }

        const checkUsername = async () => {
            setCheckingUsername(true);


            // check if username is taken

            setUsernameAvailable(querySnapshot.empty);
            setCheckingUsername(false);
        };

        const debounceCheck = setTimeout(checkUsername, 500); // 500ms debounce

        return () => clearTimeout(debounceCheck);
    }, [username]);

    // remove Firebase from error message
    useEffect(() => {
        if (loginErrorMessage.includes('Firebase: ')) {
            setLoginErrorMessage(
                loginErrorMessage
                    .replace('Firebase: ', '')  // Remove 'Firebase: '
                    .replace(/\s*\(.*?\/(.*?)\)\./, ': $1') // Add a colon and space before the captured part
                    .replace(/-/g, ' ') // Replace hyphens with spaces
            );
        }
    }, [loginErrorMessage]);

    useEffect(() => {
        if (registerErrorMessage.includes('Firebase: ')) {
            setRegisterErrorMessage(
                registerErrorMessage
                    .replace('Firebase: ', '')  // Remove 'Firebase: '
                    .replace(/\s*\(.*?\/(.*?)\)\./, ': $1') // Add a colon and space before the captured part
                    .replace(/-/g, ' ') // Replace hyphens with spaces
            );
        }
    }, [registerErrorMessage])

    return (
        <div className="containero">
            <div className='login'>
                {!forgotPassword ? (
                    <div className='item'>
                        <h2>Welcome back,</h2>
                        <form onSubmit={handleLogin}>
                            <input type='text' placeholder='Email' name='email' />
                            <input type='password' placeholder='Password' name='password' />
                            <button disabled={loading}>{loading ? 'loading' : 'Sign In'}</button>
                            {loginError && (
                                <div className='errormessage'>
                                    <h3>Could not log in!</h3>
                                    <span>{loginErrorMessage}</span>
                                </div>
                            )}
                        </form>
                        <span className='forgotpassword' onClick={() => setForgotPassword(true)}>
                            forgot password
                        </span>
                    </div>
                ) : (
                    <div className='item'>
                        <div className="forgotitle">
                            <div className="backbutton">
                                <button onClick={() => setForgotPassword(false)}>back</button>
                            </div>
                            <h2>Reset Password</h2>
                        </div>
                        <form onSubmit={sendPasswordReset}>
                            <input type='text' placeholder='Email' name='email' />
                            <button type='submit'>Send</button>
                        </form>
                    </div>
                )}
                <div className='separator'></div>
                {createAccountAvailable && (
                    <div className='item'>
                        <h2>Create an account</h2>
                        <form onSubmit={handleRegister}>
                            <label htmlFor='file'>
                                <img src={avatar.url || './avatar.png'} alt='' />
                                Upload avatar pic
                            </label>
                            <input type='file' id='file' style={{ display: 'none' }} onChange={handleAvatar} />
                            <input
                                type='text'
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Update username state
                            />
                            {checkingUsername ? (
                                <span>Checking username...</span>
                            ) : usernameAvailable === false ? (
                                <span className='error'>Username is taken</span>
                            ) : usernameAvailable === true ? (
                                <span className='success'>Username is available</span>
                            ) : null}
                            <input type='text' placeholder='Email' name='email' />
                            <input type='password' placeholder='Password' name='password' />
                            <button disabled={loading || usernameAvailable === false}>
                                {loading ? 'loading' : 'Register'}
                            </button>
                            {registerSuccess && (
                                <div className='registersuccess'>
                                    <h3>Registered successfully!</h3>
                                </div>
                            )}
                            {registerError && (
                                <div className='errormessage'>
                                    <h3>Could not create user!</h3>
                                    <span>{registerErrorMessage}</span>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login