import axios from "axios"
import axio from "axios"

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axio.defaults.headers.common['Authorization']
    }
}

export default setAuthToken