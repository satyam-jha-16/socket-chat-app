'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type AuthUserType = {
    id: string
    fullName: string
    username: string
    profilePic: string
    gender: string
};

const AuthContext = createContext<{
    authUser: AuthUserType | null,
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>,
    isLoading: boolean,
}>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: true,
})

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/getme`,{
                    method : 'GET',
                    credentials : 'include'
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setAuthUser(data);
            } catch (error) {
                // console.log(error);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchAuthUser();
    }, [])
    return (
        <AuthContext.Provider value={{
            authUser,
            setAuthUser,
            isLoading
        }} >
            {children}
        </AuthContext.Provider>
    )
}