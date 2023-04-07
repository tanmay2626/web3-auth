import '../styles/globals.css'
import {
  createClient,
  configureChains,
  WagmiConfig,
  mainnet,
} from "wagmi";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from "wagmi/providers/public";

const { chains,provider, webSocketProvider } = configureChains([mainnet], [
  publicProvider(),
]); // config provider like alchemy/infura
// currently no provider is passed ( default being used )

const client = createClient({ 
  autoConnect: true,
  connectors: [  // chains - to pass chains supported by app
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode : true
      },
    }),
  ],
  provider,
  webSocketProvider,
})
 

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
