'use client'
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

type SigninInputs = {
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string,
}
const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const signup = async (inputs: SigninInputs) => {
        // console.log(inputs)
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
                credentials : 'include',
            });
            // console.log(res.headers.get('jwt'));
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(data);            

        } catch (
        error: any
        ) {
            toast({
                title: error.message,
            });
            console.log(error);
            return;
        } finally {
            setLoading(false);
        }
    }
    return {loading, signup};
};
export default useSignup;