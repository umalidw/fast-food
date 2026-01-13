import { create } from 'zustand'
import {User} from "@/type";
import {getCurrentUser} from "@/lib/appwrite";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setIsLoading: (isLoading: boolean) => void;

    fetchAuthticatedUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated:false,
    user:null,
    isLoading:true,

    setIsAuthenticated:(value) => set({isAuthenticated:value}),
    setUser:(user)=>set({user}),
    setIsLoading : (value)=> set({isLoading:value}),
    fetchAuthticatedUser:async ()=>{
        set({isAuthenticated:true})
        try {

            const user = await  getCurrentUser();
            if(user){
                set({isAuthenticated:true, user:user});
            }
        }
        catch (e) {

            console.log("fetchAuthticatedUser error:", e)
            set({isLoading:false,user:null})

        }
        finally {
            set({isLoading:false});
        }
    }

}))
