import Image from "next/image"
import React, { useState } from "react"
import GameScreenHeader from "./GameScreenHeader"

const GameScreen = () => {
  const [spotifyLink, setSpotifyLink] = useState("")

  const handleInputChange = (event) => {
    setSpotifyLink(event.target.value)
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
    </div>
  )
}

export default GameScreen
