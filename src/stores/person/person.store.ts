import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"
import { logger } from "../middlewares/logger"

interface PersonState {
    firstName: string
    lastName: string
}

interface Actions {
    setFirstName: (firstName: string) => void
    setLastName: (lastName: string) => void
}

type PersonStore = PersonState & Actions

const customSessionStorage: StateStorage = {
    getItem: function (name: string): string | null | Promise<string | null> {
        const data = sessionStorage.getItem(name)
        return data
    },
    setItem: function (name: string, value: string): void {
        sessionStorage.setItem(name, value)
    },
    removeItem: function (name: string): unknown | Promise<unknown> {
        console.log(name)
        return null
    }
}

export const usePersonStore = create<PersonStore>()(
    // se guarda en local storage
    // persist(
    //     (set)=>({
    //         firstName: '',
    //         lastName: '',

    //         setFirstName: (value: string) => set(state => ({firstName: value})),
    //         setLastName: (value: string) => set(state => ({lastName: value})),
    //     }),
    //     {
    //         name: 'person-storage'
    //     }
    // )
    // guardar en sesion se borra al cerrar navegador
    // logger (
        persist(
            (set)=>({
                firstName: '',
                lastName: '',

                setFirstName: (value: string) => set(() => ({firstName: value})),
                setLastName: (value: string) => set(() => ({lastName: value})),
            }),
            {
                name: 'person-storage',
                storage: createJSONStorage(()=>customSessionStorage)
            }
        )
    // )
)