'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import useLogin from "@/hooks/useLogin";

const Page = () => {
    const router = useRouter();
    const {authUser} = useAuthContext();
    if (authUser){
        router.push('/');
    }
    const {login, loading} = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");

    const handleForgotPassword = () => {
        toast({
            title : 'Feature Coming',
        })
    }

    const handleSignIn = async() => {
        if (!username || !password) {
            toast({
                title : 'Please enter username and password.',
            })
            return;
        }
        // const response = axios.get("http://github.com/satyam-jha-16")
        // // console.log(response);
        login(username, password);

    }
    return (
        <div>
            <MaxWidthWrapper className="flex flex-col items-center justify-center">
                <div className="flex flex-col text-center mt-4 md:mt-8 justify-center items-center">
                    <Image src="/signin.png" alt="Logo" width={200} height={100} />
                    <h1 className="text-2xl mt-2 font-bold">Sign In</h1>
                    <h2 className="text-neutral-500 mt-2 font-regular">
                        Enter your email and password to continue
                    </h2>
                </div>
                <div className="relative flex flex-col items-center justify-center w-full mt-6 p-4">

                    <div className="relative flex justify-center items-center">
                        <Mail className="absolute  left-3 text-neutral-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full h-12 pl-10 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
                        />
                    </div>
                    <div className="relative flex justify-center mt-3 items-center">
                        <LockKeyhole className="absolute  left-3 text-neutral-500" size={18} />
                        <input
                            type={type}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 pl-10 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
                        />
                        <button
                            onClick={() => setType(type === "password" ? "text" : "password")}
                            className="absolute top-3 right-3 text-neutral-500"
                        >
                            {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {/*  */}

                    <div className="flex justify-end mt-4">
                        <button onClick={handleForgotPassword} className="text-neutral-800 font-medium text-sm">
                            Forgot Password?
                        </button>
                    </div>
                    <button
                        onClick={handleSignIn}
                        className="w-80 h-12 mt-4 rounded-lg bg-neutral-800 text-white font-medium flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                    <div className="text-center mt-4">
                        <span className="text-sm font-normal text-neutral-500">
                            Don&apos;t have an account?{" "}
                        </span>
                        <Link href={'/auth/signup'} className="text-neutral-800 font-medium">
                            Sign Up
                        </Link>
                    </div>
                </div>


            </MaxWidthWrapper>

        </div>
    )
}
export default Page;
