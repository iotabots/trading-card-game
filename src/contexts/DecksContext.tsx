import React, { Dispatch, SetStateAction } from 'react'
import { DECK, DECKS } from '../data/deck'
import { DeckType } from '../types'

export interface DecksContextType {
  selected: number
  setSelected: (id: number) => void
  edit: number | undefined
  setEdit: Dispatch<SetStateAction<number | undefined>>
  decks: DeckType[]
  setDecks: (decks: DeckType[]) => void
}

export const DecksContext = React.createContext<DecksContextType>(
  {} as DecksContextType
)

export const DecksProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = React.useState(0)
  const [edit, setEdit] = React.useState<number | undefined>(undefined)
  const [decks, setDecks] = React.useState<DeckType[]>(DECKS)

  React.useEffect(() => {
    console.log('Selected ID: ', selected)
    console.log('Selected Item: ', decks[selected])
  }, [selected, edit])

  const context: DecksContextType = {
    selected,
    setSelected,
    edit,
    setEdit,
    decks,
    setDecks
  }

  return (
    <DecksContext.Provider value={context}>
      {children}
    </DecksContext.Provider>
  )
}