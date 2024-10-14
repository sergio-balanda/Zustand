import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = ''

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            // name = person-storage
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(response => response.json())
            return JSON.stringify(data)
        }catch (err) {
            console.log(err)
            return null
        }
    },
    setItem: async function (name: string, value: string): Promise<unknown> {
        await fetch(`${firebaseUrl}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(response => response.json())
        return;
    },
    removeItem: function (): unknown | Promise<unknown> {
        throw new Error("Function not implemented.");
    }
}

export const customFirebaseStorage = createJSONStorage(()=>storageApi)