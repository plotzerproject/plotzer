import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth, db} from '../services/firebase'
import {collection, query, where, addDoc } from 'firebase/firestore'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) //null | {}
    // const [loading, setLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (val) => {
            if (val) {
                setUser({
                    name: val.displayName,
                    email: val.email,
                    photo: val.photoURL,
                    uid: val.uid
                })
            }
          })
    },[])

    async function addUserDB() {
        const ref = collection(db, "users")
        const q = query(ref, where("uid", "===", user.uid))
        console.log("q", q)

        try {
            console.log(user)
            const docRef = await addDoc(collection(db, "users"), {
                name: user.name,
                email: user.email,
                photo: user.photo,
                uid: user.uid
              });
              console.log("docref", docRef)
              
            } catch (error) {
            console.error(error)
            
        }
    }

    async function Login(email, password) {
        
    }

    async function LoginGoogle() {
        const provider = new GoogleAuthProvider()

        try {
            
            const userData = await signInWithPopup(auth, provider)
            console.log(userData)
            setUser({
                name: userData.user.displayName,
                email: userData.user.email,
                photo: userData.user.photoURL,
                uid: userData.user.uid
            })
            addUserDB()
            return true
        } catch (error) {
            if(error.message === "Firebase: Error (auth/popup-closed-by-user).") {
                return {
                    error: true,
                    message: "Você deve escolher uma conta para logar"
                }
            } else {
                return {
                    error: true,
                    message: "Ocorreu um erro ao logar"
                }
            }
        }
    }

    async function logout() {
        try {
            await signOut(auth)
            navigate("/login", {replace: true})
        } catch (error) {
            alert("Ocorreu um erro ao deslogar")
        }
    }

    async function handleSignUp(formData) {
        
    }


    return (
        <AuthContext.Provider value={{ authenticated: Boolean(user), user, Login, LoginGoogle, logout, handleSignUp }}>
            {children}
        </AuthContext.Provider>
    )
}