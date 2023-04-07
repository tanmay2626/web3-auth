import React from 'react'
import { useBalance } from 'wagmi';
import Link from 'next/link';

const WalletInfo = ({ walletAddress }) => {
    const balance = useBalance({ address : walletAddress });
    // etherscanProvider.getHistory(address).then((history) => {
    //     history.forEach((tx) => {
    //         console.log(tx);
    //     })
    // });
    
  return (
    <div>
        <h3>Address : {walletAddress}</h3>
        <h3>Balance: {balance.data?.formatted} {balance.data?.symbol}</h3>
        <Link href='/profile'><p>Back</p></Link>
    </div>
  )
}

export default WalletInfo