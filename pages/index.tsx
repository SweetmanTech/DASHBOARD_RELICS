/* eslint-disable no-console */
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import SeoHead from "../components/SeoHead"

const GameScreen = dynamic(() => import("../components/DashboardPage"))

const Home: NextPage = () => (
  <div className="bg-white text-black">
    <SeoHead title="Relics Dashboard" description="onchain data for cre8ors" image="" />

    <GameScreen />
  </div>
)

export default Home
