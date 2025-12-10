const Api = "https://689efc1f3fed484cf878a4ca.mockapi.io/users";
import { create } from "zustand"

export const useZustand = create((set, get) => ({
    data: [],
    getTodo: async () => {
        try {
            let res = await fetch(Api)
            let data = await res.json()
            set({ data:data })
        } catch (error) {
            console.error(error);

        }

    },
    deletetodo: async (id) => {
        try {
            await fetch(`${Api}/${id}`, {
                method: "DELETE",
            });
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },

    adduser: async (newuer) => {
        try {
            await fetch(Api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newuer)
            })
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },

    edituser: async (name) => {
        console.log(name)
        try {
            await fetch(`${Api}/${name.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(name)
            })
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
      chexbox: async (elem) => {
        try {
            await fetch(`${Api}/${elem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...elem,status:!elem.status})
            },)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
}));



