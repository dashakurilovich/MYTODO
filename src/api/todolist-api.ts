import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "33da280a-817c-4d68-91d3-3b1eca4d1d69"
    }
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get("https://social-network.samuraijs.com/api/1.1", settings);
        return promise
    },
    createTodolists(title: string) {
        const promise = axios.post("https://social-network.samuraijs.com/api/1.1", { title: title }, settings)
        return promise
    },
    deleteTodolists(id: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolists(id: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title: title }, settings)
    }
}