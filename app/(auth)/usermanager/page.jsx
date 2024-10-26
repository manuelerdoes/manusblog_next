'use client'

import React, { useEffect, useState } from 'react'
import { auth } from '../../lib/firebase';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { checkUsername, getUser, updateUsername } from '@/app/lib/dbActions';
import { useRouter } from 'next/navigation';


function Usermanager() {

    const router = useRouter();
    const currentUser = {
        username: "Max Muster",
        email: "maximux@mesongo.com",
        avatar: "/avatar.png"
    }
    // TODO: get current User from store or something
    const [loading, setLoading] = useState(false);
    const [avatarStatus, setAvatarStatus] = useState("Save");
    const [inputUsername, setInputUsername] = useState("");
    const [usernameStatus, setUsernameStatus] = useState("Change Username");
    const [inputPassword, setInputPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("Change Password");
    const [inputCurrentPassword, setInputCurrentPassword] = useState("");
    const [usernameAvailable, setUsernameAvailable] = useState(null); // Check if username is available
    const [checkingUsername, setCheckingUsername] = useState(false);

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatarStatus("Save");
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleUpdateAvatar = async () => {
        setLoading(true);

        // TODO: upload avatar image to storage
        //const imgUrl = await upload(avatar.file);

        try {
            // TODO: update user's avatar in db

            setAvatarStatus("Saved!")
        } catch (error) {
            console.log(error.message)
            setAvatarStatus(error.message)
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateUsername = async () => {
        setLoading(true);

        try {
            const res = await updateUsername(auth.currentUser.id, inputUsername);
            setUsernameStatus("Username changed: " + res);
        } catch (error) {
            console.log(error.message);
            setUsernameStatus(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Debounced username availability check
    useEffect(() => {
        if (inputUsername.trim() === '') {
            setUsernameAvailable(null);
            return;
        }

        const checkUsernameAvailability = async () => {
            setCheckingUsername(true);
            try {
                const isUsernameTaken = await checkUsername(inputUsername);
                if (isUsernameTaken) {
                    setUsernameStatus("username already taken");
                    setLoading(true);
                }
                setUsernameAvailable(!isUsernameTaken); // If username is taken, set to false
            } catch (error) {
                console.error("Error checking username availability:", error);
                setUsernameAvailable(null); // Handle error case
            } finally {
                setCheckingUsername(false);
                setLoading(false);  
            }
        };

        const debounceCheck = setTimeout(checkUsernameAvailability, 500); // 500ms debounce

        return () => clearTimeout(debounceCheck);
    }, [inputUsername]);

    const handleUsernameInputChange = (e) => {
        setInputUsername(e.target.value)
        setUsernameStatus("Change Username")
    }

    const handleUpdatePassword = async () => {
        setLoading(true);

        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,  // User's email
                inputCurrentPassword // The current password user provides before updating
            );

            // Reauthenticate the user
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, inputPassword);

            setPasswordStatus("Password changed!");
        } catch (error) {
            console.log(error.message);
            setPasswordStatus(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handlePasswordInputChange = (e) => {
        setInputPassword(e.target.value)
        setPasswordStatus("Change Password")
    }

    const handleLogout = () => {
        auth.signOut();
        router.push('/login');
    }


    return (
        <div className="containero">
            <div className='usermanager'>
                <div className="info">
                    <h2>{currentUser.username}</h2>
                    <p>{currentUser.email}</p>
                    <div className="changeavatar">

                        <label htmlFor="file">
                            <img src={!avatar.file ? currentUser.avatarURL || "./avatar.png"
                                : avatar.url || "./avatar.png"} alt="" />
                            Upload new avatar pic
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                        <button disabled={loading} onClick={handleUpdateAvatar}>
                            {loading ? "loading..." : avatarStatus}</button>
                    </div>
                </div>
                <div className="useraction">
                    <div className="changeusername">
                        <input type="text" placeholder='Username' name='username'
                            onChange={handleUsernameInputChange} />
                        <button disabled={loading} onClick={handleUpdateUsername}>
                            {loading ? "loading..." : usernameStatus}</button>
                    </div>
                    <div className="changepassword">
                        <input type="password" placeholder='Old Password' name='oldpassword'
                            onChange={(e) => { setInputCurrentPassword(e.target.value) }} />
                        <input type="password" placeholder='New Password' name='password'
                            onChange={handlePasswordInputChange} />
                        <button disabled={loading} onClick={handleUpdatePassword}>
                            {loading ? "loading..." : passwordStatus}</button>
                    </div>
                    <div className="logout">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usermanager