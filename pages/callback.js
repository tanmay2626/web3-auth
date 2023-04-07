import React,{ useEffect } from 'react'
import { magic } from '../libs/magic';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useConnect } from 'wagmi';

const Callback = props => {
    const { connect } = useConnect();
    const router = useRouter();

    useEffect(() => {
        router.query.provider && finishSocialLogin();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [router.query]);

    const finishSocialLogin = async () => {
        let result = await magic.oauth.getRedirectResult();
        authenticateWithServer(result.magic.idToken);
      };

      const authenticateWithServer = async (props) =>{
        try{
          let userMetadata = await magic.user.getMetadata();
          //returns email phone issuer(address)
         const walletAddress = userMetadata.issuer.split(':')[2];
         axios.post("http://localhost:8080/api/signin",{ walletAddress })
         .then(res =>{
           localStorage.setItem('token',`Bearer ${res.data.token}`);
           connect(walletAddress);
           router.push('/profile');
         })
         .catch(err =>{
             console.log(`Errorx: ${err}`); 
             router.push('/signin');
         })
       }catch(err){
        console.log(err);
       }
      }

  return (
    <div>
    <h1>Loading</h1>
    </div>
  )
}

export default Callback;