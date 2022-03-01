// P L A Y E R
export interface CardStack {
  cards: string[]
  size: string
}

export interface PlayerType {
  addr: string
  botZone: CardStack
  deck: CardStack
  hand: CardStack
  junk: CardStack
  mana: string
  health: string
}

export interface GameState {
  id: string | null
  player1: PlayerType
  player2: PlayerType
  winner: string
  state: string
  turn: string
  phase: string
}

// C A R D S
export interface CardType {
  id: string
  image?: string
  name?: string
  description?: string
  mana?: number
  health?: number
}

export interface DeckItemType {
  id: string
  type: string
  name: string
  image: string
  mana: number
  attack: number
  defense: number
  hits: number
  count: number
}

export interface DeckType {
  id: number
  name: string
  cards: DeckItemType[]
}
