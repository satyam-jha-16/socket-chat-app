import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ToastManager, { Toast } from 'toastify-react-native'
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState("password");
  const [tnc, setTnc] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();
    //console.log(fullName, username, password, confirmPassword, gender);
    

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      Toast.error('Please fill in all fields.', 'bottom');
      return;
    }
    if (password !== confirmPassword) {
      Toast.error('Password and confirmPassword should match', 'bottom');
      return;
    }
    if(!tnc) {
      Toast.error('Please agree to the Terms and Conditions', 'bottom');
      return;
    }


    setLoading(true);
    try {
      const response = await axios.post(`${process.env.API_ENDPOINT}/api/auth/signup`, {
        fullName,
        username,
        password,
        confirmPassword,
        gender
      });

      if (response.status === 201) {
        Toast.success('Account created successfully 🚀', 'bottom');
        setFullName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setGender('');
        router.push('/login');
      } else {
        Toast.error('Could not create account. Please try again.', 'bottom');
      }
    } catch (error) {
      console.log(error);
      Toast.error(error.response?.data?.error || 'Could not create account. Please try again.', 'bottom');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="items-center justify-center flex-1 px-4">
        {/* Greetings */}
        <View className="items-center mx-auto">
          <Image
            style={{
              height: 200,
              width: 200
            }}
            source={require('@/assets/images/signup.png')}
          />
          <Text className="text-2xl text-neutral-800 mt-2">
            Sign Up
          </Text>
          <Text className="text-neutral-500 mt-2">
            Create an account to continue
          </Text>
        </View>

        {/* Form */}
        <View className="relative items-start w-full mt-6 p-3">
          <View className="relative w-full">
            <User size={18} style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#737373"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>
          <View className="relative w-full mt-3">
            <Mail size={16} style={styles.icon} />
            <TextInput
              keyboardType="email-address"
              placeholder="Username"
              placeholderTextColor="#737373"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>
          <View className="relative w-full mt-3">
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
          <View className="relative w-full mt-3">
            <LockKeyhole size={16} style={styles.icon} />
            <TextInput
              secureTextEntry={type === "password"}
              placeholder="Confirm Password"
              placeholderTextColor="#737373"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
            <Pressable style={styles.eyeIcon} onPress={() => setType(type === "password" ? "text" : "password")}>
              {type === "password" ? <EyeOff size={20} style={styles.icon} /> : <Eye size={20} style={styles.icon} />}
            </Pressable>
          </View>

          {/* Gender Selection */}
          <View className="flex-row mt-5">
            <View className="flex-row ml-2">
              <View className='flex-row'>
                <BouncyCheckbox
                  size={20}
                  fillColor="#171717"
                  iconStyle={{ borderColor: "#171717" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ textDecorationLine: "none" }}
                  onPress={(isChecked: boolean) => {
                    if (isChecked) setGender('male');
                  }}
                  isChecked={gender === 'male'}
                />
                <Text> Male</Text>
              </View>
              <View className='flex-row ' >
                <BouncyCheckbox
                  size={20}
                  fillColor="#171717"
                  iconStyle={{ borderColor: "#171717" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ textDecorationLine: "none" }}
                  onPress={(isChecked: boolean) => {
                    if (isChecked) setGender('female');
                  }}
                  isChecked={gender === 'female'}
                  style={{ marginLeft: 10 }}
                />
                <Text> Female </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-start mt-5">
            <BouncyCheckbox
              size={18}
              fillColor="#171717"
              disableText
              iconStyle={{ borderRadius: 4, marginLeft: 4 }}
              innerIconStyle={{ borderRadius: 4, borderColor: '#737373' }}
              onPress={(isChecked) => { 
                Keyboard.dismiss() 
                setTnc(isChecked)
              }}
            />
            <Text className="text-neutral-500 ml-2 text-sm">
              I agree to the <Text className="text-neutral-800">Terms</Text> and <Text className="text-neutral-800">Privacy Policy</Text>
            </Text>
          </View>
          <View className="relative w-full mt-4">
            <TouchableOpacity
              onPress={handleSignUp}
              className="flex-row items-center justify-center w-full h-12 py-2 rounded-lg bg-neutral-800"
            >
              {loading ? (
                <ActivityIndicator size={16} color="#fff" />
              ) : (
                <Text className="text-white">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="w-full mt-4">
            <View className="flex-row items-center justify-center">
              <Text className="text-center text-sm text-neutral-500">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-neutral-800 ">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ToastManager width={350} />
      </View>
    </View>
  );
};

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

export default SignUp;
