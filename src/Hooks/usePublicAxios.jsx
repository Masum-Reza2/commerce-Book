import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { token: localStorage.getItem('token') }
});

const usePublicAxios = () => {
    return instance
}

export default usePublicAxios