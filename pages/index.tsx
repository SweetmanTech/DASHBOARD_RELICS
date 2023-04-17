/* eslint-disable no-console */
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import SeoHead from "../components/SeoHead"

const GameScreen = dynamic(() => import("../components/GameScreen"))

const Home: NextPage = () => (
  <div className="bg-white text-black">
    <SeoHead title="SyncStream" description="play-to-stream" image="" />

    <GameScreen />
  </div>
)

export default Home
