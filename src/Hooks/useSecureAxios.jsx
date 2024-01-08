import axios from "axios";

const instance = axios.create({
    baseURL: 'https://commerce-book-server.vercel.app',
    headers: { token: localStorage.getItem('token') }
});

const useSecureAxios = () => {
    return instance
}



export default useSecureAxios