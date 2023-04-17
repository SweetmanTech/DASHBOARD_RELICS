const getTrackId = (spotifyShareUrl: string) => {
  const startIndex = spotifyShareUrl.indexOf("track/") + 6
  const endIndex = spotifyShareUrl.indexOf("?")
  return spotifyShareUrl.substring(startIndex, endIndex)
}

export default getTrackId
