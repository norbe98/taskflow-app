import { createContext, useContext, useEffect, useState } from "react";
import type { User,  AuthContext, AuthUser } from "../types/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User |null>(null)
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        getMe()
        setMessage("")
    }, [])
    
    function changeMessage(message: string) {
        setMessage(message)
    }

    function changeLoading(boolean: boolean) {
        setLoading(boolean)
    }

    function handleExpiredToken() {
        localStorage.removeItem("token") 
        setUser(null) 
        alert("Your session expired. Please log in again.") 
        navigate("/")
    }

    async function getMe() {
        const token = localStorage.getItem("token")

        if(!token) return
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const user = await res.json()

        if (res.status === 401) {
            handleExpiredToken()
            return
        }

        if(user) {
            setUser(user)
        }
    }
    
    async function signUp(data: AuthUser) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const content = await res.json()

        if(!res.ok) {
            throw new Error(content.message);
        }

        return content

    }

    async function signIn(data: AuthUser) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const user = await res.json()
            
        if(!res.ok) {
            throw new Error(user.message)
        }

        if(res.status === 200) {
            localStorage.setItem("token", user.token)
            setUser(user.userData)
            navigate("/")
            alert("You logged in successfully!")
            setMessage("")
        }
        return user
    }

    async function logOut() {
        localStorage.removeItem("token")
        setUser(null)
        toast.success("You logged out successfully!")
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, message, logOut, changeMessage, loading, changeLoading, handleExpiredToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("AuthContext does not exist!");
    return ctx
}