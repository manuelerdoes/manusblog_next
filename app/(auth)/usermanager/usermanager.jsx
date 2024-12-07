'use client'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

function UserManager() {

  const { data: session } = useSession()
  const { update } = useSession();
  const router = useRouter();
  // const { updateimage } = useSession();

  const [loading, setLoading] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState("Save");

  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    avatar: ''
  })

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

    try {
      const formData = new FormData();
      formData.append('file', avatar.file);
      formData.append('email', currentUser.email);

      const response = await fetch(`/api/user/${currentUser.email}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload picture');
      }

      const data = await response.json();
   
      update({ image: data.fileUrl });
      setAvatarStatus("Saved! (Reload to see changes)");
    } catch (error) {
      console.error(error.message)
      setAvatarStatus(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        username: session.user.name,
        email: session.user.email,
        avatar: session.user.image
      })
    }
  }, [session])

  const handleSignout = async (e) => {
    e.preventDefault();
    signOut();
    router.push('/sign-in');
  }

  return (
    <div className="usermanager">
      <div className="info">
        <h2>{currentUser.username}</h2>
        <p>{currentUser.email}</p>
        <div className="changeavatar">

          <label htmlFor="file">
            <img src={!avatar.file ? currentUser.avatar || "/avatar.png"
              : avatar.url || "/avatar.png"} alt="" />
            Upload new avatar pic
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <button disabled={loading} onClick={handleUpdateAvatar}>
            {loading ? "loading..." : avatarStatus}</button>
        </div>
      </div>
      <div className="useraction">
        {!currentUser.username && <div className="new-user-info">
          <p>You're new! Please set a username.</p></div>}
        <div className="changeusername">

          <button onClick={() => router.push('/setusername')}>Change Username</button>
        </div>
        <div className="logout">
          <button onClick={handleSignout}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default UserManager