import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AwardIcon, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react-native';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import ToastManager, { Toast } from 'toastify-react-native'

const SignIn = () => {
    const toast = useToast();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        Keyboard.dismiss();

        if (!username || !password) {
            Toast.info('Please enter username and password.', "bottom")
            return;
        }

        setLoading(true);
        //        const res = await axios.get("http://github.com/satyam-jha-16")
        //      console.log(res.data)
        try {
            const response = await axios.post(`${process.env.API_ENDPOINT}/api/auth/login`, {
                username,
                password
            });
            // console.log(response.data);

            if (response.status === 200) {
                const userData = response.data;
                Toast.success("You are Logged In 🚀");
                setUsername("");
                setPassword("");
                // Save the user data or token to the state or AsyncStorage
                // AsyncStorage.setItem('userData', JSON.stringify(userData));
                router.push("/");
            } else {
                Toast.error("Could not Sign In. Please try again.", "bottom");
            }
        } catch (error) {
            console.log(error);
            Toast.error(error.response?.data?.error || "Could not Sign In. Please try again.", "bottom");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        Toast.info("This feature will be available soon. 🚀", "bottom");
    };

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center px-4">
                <View className="items-center mx-auto">
                    <Image
                        source={require('@/assets/images/signin.png')}
                        style={{ height: 200, width: 200 }}
                    />
                    <Text className="text-2xl text-neutral-800 font-semibold mt-2">
                        Sign In
                    </Text>
                    <Text className="text-neutral-500 mt-2 font-regular">
                        Enter your email and password to continue
                    </Text>
                </View>
                <View className="relative items-start w-full mt-6 p-4">
                    <View className="relative w-full">
                        <Mail size={18} style= {styles.icon} />
                        <TextInput
                            keyboardType="email-address"
                            placeholder="Email"
                            placeholderTextColor="#737373"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <LockKeyhole size={18} style={styles.icon} />
                        <TextInput
                            secureTextEntry={type === "password"}
                            placeholder="Password"
                            placeholderTextColor="#737373"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                        <Pressable style={styles.eyeIcon} onPress={() => setType(type === "password" ? "text" : "password")}>
                            {type === "password" ? <EyeOff size={20} style={styles.icon} /> : <Eye size={20} style={styles.icon} />}
                        </Pressable>
                    </View>
                    <View className="flex-row items-center justify-end mt-4 ml-auto">
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text className="text-neutral-800 font-medium text-sm">Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="relative w-full mt-4">
                        <TouchableOpacity
                            onPress={handleSignIn}
                            className="flex-row items-center justify-center w-full h-12 py-2 rounded-lg bg-neutral-800"
                        >
                            {loading ? (
                                <ActivityIndicator size={16} color="#fff" />
                            ) : (
                                <Text className="text-white font-medium">
                                    Sign In
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="w-full mt-4">
                        <View className="flex-row items-center justify-center">
                            <Text className="text-center text-sm font-regular text-neutral-500">
                                Don't have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => router.push("/signup")}>
                                <Text className="text-neutral-800 font-medium">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ToastManager width={350} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginTop: 16,
    },
    input: {
        width: '100%',
        height: 42,
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    icon: {
        position: 'absolute',
        top: 12,
        left: 10,
        color: '#737373',
    },
    eyeIcon: {
        position: 'absolute',
        top: 0,
        right: 40,
    },
});

export default SignIn;

