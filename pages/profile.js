import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDisconnect } from 'wagmi';
import { magic } from '../libs/magic';

const Profile = props => {
    const router = useRouter();
    const { disconnect } = useDisconnect();

    const logoutMagic = async() =>{
      await magic.user.logout();
    }
    useEffect(()=>{
      const token  = localStorage.getItem('token');
        if(!token){
          router.push('/signin');
        }
    });

    const SignOut = (e) =>{
           e.preventDefault();
          disconnect();
          logoutMagic();
           localStorage.removeItem('token');   
      }

  return (
    <div className='profile'>
    <div className="wallets">

    <button onClick={() =>{ router.push('/wallet') }}>MyWallet</button>
    <button onClick={SignOut}>SignOut</button>
    </div>
    </div>
  )
}

export default Profile;