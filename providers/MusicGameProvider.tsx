import { useContext, useMemo, useState } from "react"
import MusicGameContext from "./MusicGameContext"

export const useMusicGameProvider = () => useContext(MusicGameContext)

export const MusicGameProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const value = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading],
  )
  return <MusicGameContext.Provider value={value}>{children}</MusicGameContext.Provider>
}
