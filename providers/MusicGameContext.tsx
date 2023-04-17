import { createContext, SetStateAction, Dispatch } from "react"

export interface MusicGameContextInterface {
  loading: boolean
  setLoading?: Dispatch<SetStateAction<boolean>>
}
export const initialContext: MusicGameContextInterface = {
  loading: false,
}
const MusicGameContext = createContext<MusicGameContextInterface>(initialContext)

export default MusicGameContext
