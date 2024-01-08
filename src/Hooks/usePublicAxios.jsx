import axios from "axios";

const instance = axios.create({
    baseURL: 'https://commerce-book-server.vercel.app',
    headers: { token: localStorage.getItem('token') }
});

const usePublicAxios = () => {
    return instance
}

export default usePublicAxios