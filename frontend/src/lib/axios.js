import axios from 'axios'

const api = axios.create({
    baseURL:"https://notesapp-gvf1.onrender.com/",
})

export default api