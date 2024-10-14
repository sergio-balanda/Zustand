import { create } from "zustand"

interface Bear {
    id: number
    name: string
}

interface BearState {
    blackBears: number
    polarBears: number
    pandaBears: number
    bears: Bear[]
    computed: {
        totalBears: number
    }
    increaseblackBears: (qtty:number) => void
    increasePolarBears: (qtty:number) => void
    increasePandaBears: (qtty:number) => void
    doNothing: () => void
    addBear: () => void
    clearBear: () => void
}

export const useBearStore = create<BearState>()((set, get)=>({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,
    bears: [{ id: 1, name: 'Oso #1' }],
    computed:{
        get totalBears(){
            return get().blackBears + get().polarBears + get().pandaBears + get().bears.length
        }
    },
    increaseblackBears: (qtty:number) => set((state)=>({
        blackBears: state.blackBears + qtty
    })),
    increasePolarBears: (qtty:number) => set((state)=>({
        polarBears: state.polarBears + qtty
    })),
    increasePandaBears: (qtty:number) => set((state)=>({
        pandaBears: state.pandaBears + qtty
    })),
    doNothing: () => set(state=>({
        bears: [...state.bears]
    })),
    addBear: () => set(state=>({
        bears: [
            ...state.bears, 
            {id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`}
        ]
    })),
    clearBear: () => set({bears: []})
}))