import { create } from 'zustand'
import { ItemsListType, ItemType } from './types'

interface BearState {
    items: ItemsListType
    addAllItems: (by: ItemsListType) => void
    updateItem: (id: ItemType) => void
}

export const useBearStore = create<BearState>()((set) => ({
    items: {} as ItemsListType,
    addAllItems: (by) => set({ items: by }),
    updateItem: (id) => set((state) => ({
        items: state.items.map(
            (value: ItemType) => {
                if (value.id === id.id) {
                    return id
                }
                return value

            }
        ),
    }))
}))