import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDisconnect } from 'wagmi';

const Profile = props => {
    const router = useRouter();
    const { disconnect } = useDisconnect();

    useEffect(()=>{
        const token  = localStorage.getItem('token');
        if(!token){
          router.push('/signin');
        }
    })

    const SignOut = (e) =>{
        e.preventDefault();
          disconnect();
          localStorage.removeItem("token");
      }

  return (
    <div className='profile'>
    <button onClick={SignOut}>SignOut</button>
    </div>
  )
}

export default Profile;