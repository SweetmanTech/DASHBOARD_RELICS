import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import getTrackId from "../../lib/getTrackId"
import SyncButton from "../SyncButton"
import GameScreenHeader from "./GameScreenHeader"

const GameScreen = () => {
  const [spotifyLink, setSpotifyLink] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)
    const trackId = getTrackId(spotifyLink)
    await router.push(`https://moonwalk-game.herokuapp.com/?spotifyTrackId=${trackId}`)
    setLoading(false)
  }

  const handleInputChange = (event) => {
    setSpotifyLink(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit()
    }
  }

  return (
    <div>
      <div className="flex justify-start items-center p-4">
        <Image src="/images/logo.png" alt="Logo" width={202.5} height={37.5} />
      </div>
      <GameScreenHeader />
      <div className="flex items-center justify-center mt-8">
        <input
          className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg bg-[#efedf3]"
          placeholder="Enter Spotify Song Link Here"
          value={spotifyLink}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex items-center justify-center mt-8">
        <Image
          className="rounded-md mx-2"
          src="/images/game-options.png"
          alt="Game 1"
          width={657}
          height={210}
        />
      </div>
      <div className="flex items-center justify-center mt-8">
        <SyncButton onClick={() => onSubmit()} loading={loading} />
      </div>
    </div>
  )
}

export default GameScreen
