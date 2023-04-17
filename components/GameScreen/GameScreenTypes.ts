export interface IOption {
  id: string
  name: string
  imgUrl?: string
  musicUrl?: string
}
export interface IChecked {
  drums: boolean
  vocal: boolean
  bass: boolean
  guitar: boolean
}

export type DecodedURI = {
  name: string
  image: string
  animation_url: string
  description: string
  properties: {
    name: string
    number: number
  }
  tokenId: number
}
