'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useSignup from "@/hooks/useSignup";
import { useAuthContext } from "@/context/AuthContext";

const Page = () => {
    const router = useRouter();
    const {authUser} = useAuthContext();
    if(authUser){
        router.push('/');
    }
    const [type, setType] = useState("password");
    const [gender, setGender] = useState("");
    const {loading, signup} = useSignup();
    const [inputs, setInputs] = useState({
        fullName : "",
        username : "",
        password : "",
        confirmPassword :"",
    });

    const handleForgotPassword = () => {
        toast({
            title: 'Feature Coming',
        })
    }

    const handleSignUp = async () => {
        if(!inputs.fullName || !inputs.username || !inputs.password || !inputs.confirmPassword){
            toast({
                title: 'Please fill all the fields',
            })
            return;
        }
        function isValidPassword(password : string) {
            const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;
            return passwordPattern.test(password);
          }
        if(!isValidPassword(inputs.password)){
            toast({
                title: 'Password must contain atleast one uppercase letter, one special character and one digit',
            })
            return;
        }
        if(inputs.password !== inputs.confirmPassword){
            toast({
                title: 'Passwords do not match',
            })
            return;
        }
        signup({...inputs, gender:gender});
    }

    return (
        
        <div>
             (
            <MaxWidthWrapper className="flex flex-col items-center justify-center">
                <div className="flex flex-col text-center mt-4 md:mt-8 justify-center items-center">
                    <Image src="/signup.png" alt="Logo" width={200} height={100} />
                    <h1 className="text-2xl mt-2 font-bold">Sign Up</h1>
                    <h2 className="text-neutral-500 mt-2 font-regular">
                        Create an account to continue
                    </h2>
                </div>
                <div className="relative flex flex-col items-center justify-center w-full mt-6 p-4">

                    <div className="relative flex justify-center items-center">
                        <User className="absolute  left-3 text-neutral-500" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                            className="w-full h-12 pl-10 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
                        />
                    </div>
                    <div className="relative flex justify-center items-center mt-3">
                        <Mail className="absolute  left-3 text-neutral-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                            className="w-full h-12 pl-10 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
                        />
                    </div>
                    <div className="relative flex justify-center mt-3 items-center">
                        <LockKeyhole className="absolute  left-3 text-neutral-500" size={18} />
                        <input
                            type={type}
                            placeholder="Password"
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                            className="w-full h-12 pl-10 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
                        />
                        <button
                            onClick={() => setType(type === "password" ? "text" : "password")}
                            className="absolute top-3 right-3 text-neutral-500"
                        >
                            {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="relative flex justify-center mt-3 items-center">
                        <LockKeyhole className="absolute  left-3 text-neutral-500" size={18} />
                        <input
                            type={type}
                            placeholder="Confirm Password"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
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
                    <RadioGroup
                        defaultValue={gender}
                        onValueChange={setGender}
                        className="flex flex-row space-x-4 mt-6"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                        </div>
                    </RadioGroup>

                    <div className="flex justify-end mt-4">
                        <button onClick={handleForgotPassword} className="text-neutral-800 font-medium text-sm">
                            Forgot Password?
                        </button>
                    </div>
                    <button
                        onClick={handleSignUp}
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
                            Already have an account?{" "}
                        </span>
                        <Link href={'/auth/login'} className="text-neutral-800 font-medium">
                            Sign In
                        </Link>
                    </div>
                </div>
                <div className="flex-row mt-5">

                </div>

            </MaxWidthWrapper>
    
        </div>
    )
}

export default Page;