import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as secureStore from 'expo-secure-store';
interface AuthProps {
    authState? : {
        token : string | null;
        autheneticaed : boolean | null;
    }
    onSIgnup : (fullName : string, username : string, password : string, confirmPassword : string ) => Promise<any>;

}