export interface CardType {
  id: string
  image: string
  name: string
  description?: string
  cost: number
  attack?: number
  defense?: number
}

export interface PlayerType {
  id: string
  type: string
  avatar: string
  deck: CardType[]
  hand: CardType[]
  board: CardType[]
  cemetery: CardType[]
}

export interface PhaseType {
  id: number
  label: string
  action: string
}
