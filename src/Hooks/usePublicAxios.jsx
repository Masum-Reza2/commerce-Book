import axios from "axios";

const instance = axios.create({
    baseURL: 'https://commerce-book-server-h11zwc4b5-masum-rezas-projects.vercel.app',
    headers: { token: localStorage.getItem('token') }
});

const usePublicAxios = () => {
    return instance
}

export default usePublicAxios