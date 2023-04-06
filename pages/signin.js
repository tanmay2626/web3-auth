import Wallets from '@/components/Wallets';
import GoogleAuth from '@/components/GoogleAuth';
import React from 'react'

const Signin = props => {
  return (
    <div className='signin'>
        <h1>Signin</h1>
        <Wallets />
        <p>OR</p>
        <GoogleAuth />
    </div>
  )
}


export default Signin;