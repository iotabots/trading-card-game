/* eslint-disable max-len */
import { DECK } from './cards'

export const PLAYER = {
  type: 'player',
  id: 'r3p0x',
  avatar: 'https://assets.iotabots.io/compressed/1.png',
  deck: DECK,
  hand: [],
  board: [],
  junk: [],
}

export const OPPONENT = {
  type: 'opponent',
  id: 'huhn',
  hp: 20,
  mp: 0,
  avatar: 'https://assets.iotabots.io/compressed/1000.png',
  deck: DECK,
  hand: [],
  board: [],
  junk: [],
}
