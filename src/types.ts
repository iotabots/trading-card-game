// P L A Y E R
export interface PlayerType {
  id: string
  type: string
  avatar: string
  deck: CardType[]
  hand: CardType[]
  board: CardType[]
  junk: CardType[]
}

// D E C K
export type Deck = CardType[]

// C A R D S
export interface CardType {
  id: string
  image: string
  name: string
  description?: string
  mana: number
  effects?: EffectType[]
  status?: 'deck' | 'hand' | 'board' | 'junk'
}

export interface BotType extends CardType {
  hits: number // #default: 1
  attack: number
  defense: number
  type: 'bot'
  deployed?: boolean
}

export interface BuzzType extends CardType {
  type: 'buzz'
}

export interface GameType {
  id: number
  player1: PlayerType
  player2: PlayerType
  history: {
    rounds: {
      turns: {
        player: number
        standby: {
          onDraw: (gameId: number) => CardType
          onGainMana: () => number
          effects: EffectType
          onUpdateBoard: (gameId: number) => CardType[]
        }
        play1: PlayType[]
        attack: AttackType[]
        play2: ActionType[]
        phases: {
          actions: ActionType[]
        }
      }
    }
  }
}

export interface PhaseType {
  id: number
  label: string
  action: string
}

export interface ActionType {
  player: PlayerType
}

export interface AttackType extends ActionType {
  unit: BotType
  target: BotType | PlayerType
}

export interface PlayType extends ActionType {
  card: CardType // Check if status === 'hand'
}

export interface EffectType {
  id: string
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
