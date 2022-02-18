/* eslint-disable max-len */
import { DECK } from './cards'

export const PLAYER = {
  type: 'player',
  id: 'r3p0x',
  avatar:
    'https://www.iotabots.io/_next/image?url=https%3A%2F%2Fassets.iotabots.io%2Fcompressed%2F3.png&w=828&q=75',
  deck: DECK,
  hand: [],
  board: [],
  cemetery: [],
}

export const OPPONENT = {
  type: 'opponent',
  id: 'huhn',
  hp: 20,
  mp: 0,
  avatar:
    'https://www.iotabots.io/_next/image?url=https%3A%2F%2Fassets.iotabots.io%2Fcompressed%2F5.png&w=828&q=75',
  deck: DECK,
  hand: [],
  board: [],
  cemetery: [],
}
