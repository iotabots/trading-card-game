import { GAME_DECK } from './deck'

export const PLAYER = {
  type: 'player',
  id: 'r3p0x',
  hp: 20,
  mp: 0,
  avatar: 'https://assets.iotabots.io/compressed/1.png',
  deck: GAME_DECK,
  hand: [GAME_DECK[0], GAME_DECK[1], GAME_DECK[2]],
  board: [],
  junk: [],
}

export const OPPONENT = {
  type: 'opponent',
  id: 'huhn',
  hp: 20,
  mp: 0,
  avatar: 'https://assets.iotabots.io/compressed/1000.png',
  deck: GAME_DECK,
  hand: [GAME_DECK[0], GAME_DECK[1], GAME_DECK[2]],
  board: [],
  junk: [],
}
