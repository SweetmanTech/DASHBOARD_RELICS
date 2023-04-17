import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { allChains, configureChains, createClient, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MusicGameProvider } from "../providers/MusicGameProvider"

const { chains, provider, webSocketProvider } = configureChains(
  allChains.filter((c) => c.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1)),
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: "Sonic Stream",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <MusicGameProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </MusicGameProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
