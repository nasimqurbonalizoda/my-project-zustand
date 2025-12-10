import { create } from 'zustand';


export const useSyncStore = create((set) => ({
    data: [
        { id: 1, name: "nasimjone", description: "zode", status: false },
        { id: 2, name: "komol", description: "janes", status: true }
    ],

    deleteUser: (id) =>
        set((state) => ({
            data: state.data.filter((item) => item.id !== id),
        })),

    toggleStatus: (id) =>
        set((state) => ({
            data: state.data.map((item) =>
                item.id === id ? { ...item, status: !item.status } : item
            ),
        })),

    updateUser: (id, name, description, status) =>
        set((state) => ({
            data: state.data.map((item) =>
                item.id === id
                    ? { ...item, name, description, status }
                    : item
            ),
        })),

    addUser: (name, description, status) =>
        set((state) => ({
            data: [
                ...state.data,
                {
                    id: Date.now(),
                    name,
                    description: description,
                    status,
                },
            ],
        })),
}));