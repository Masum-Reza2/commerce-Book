/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
export const GlobalContext = createContext();
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import usePublicAxios from "../Hooks/usePublicAxios";


const ControlRoom = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const publicAxios = usePublicAxios();

    // >>>>>>firebase functions<<<<<<

    // 1 create account
    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // 2 loginUser
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // 3 logOut user
    const logOutUser = () => {
        return signOut(auth)
    }

    // 4 updateUserProfile
    const updateUserProfile = (name, imageUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl
        })
    }

    // 5 update user email
    const updateUserEmail = (newEmail) => {
        setLoading(true);
        return updateEmail(auth.currentUser, newEmail)
    }

    // 6 update user password
    const updateUserPassword = (newPassword) => {
        setLoading(true);
        return updatePassword(user, newPassword)
    }

    // 7 delete a user
    const deleteHimOrHer = () => {
        setLoading(true);
        return deleteUser(user)
    }

    //  additional logins
    const additionalLogin = (provider) => {
        return signInWithPopup(auth, provider)
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            console.log('current user is', currentUser);
            // // jwt activities here remember the setLoading
            if (currentUser) {
                publicAxios.post(`/jwt`, { email: currentUser?.email || user?.email })
                    .then(res => {
                        const token = res?.data?.token;
                        localStorage.setItem('token', token);
                    })
            } else {
                localStorage.removeItem('token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])


    // >>>>>>firebase functions<<<<<<

    const globalInfo = {
        user,
        loading,
        setLoading,
        createAccount,
        loginUser,
        logOutUser,
        updateUserProfile,
        updateUserEmail,
        updateUserPassword,
        deleteHimOrHer,
        additionalLogin
    }
    return (
        <GlobalContext.Provider value={globalInfo}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ControlRoom