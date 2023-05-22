'use client'

import { useUser } from "@auth0/nextjs-auth0/client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext()

export function UserContextProvider({children}) {
    const { user, error, isLoading } = useUser();
    const [currentUser, setCurrentUser] = useState({
        email: '',
        username: '',
        first_name: '',
        profile_pic: '',
        wallet: {
            balance: 0,
        },
        transactions: [],
    })

    const getUser = async (user) => {
        const response = await fetch("/api/findOrCreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email: user.email,
                username: user.nickname,
                first_name: user.name,
                profile_pic: user.picture,
                }),
            });
        const userData = await response.json()
        console.log(userData);
        setCurrentUser({
            email: userData.user.email,
            username: userData.user.username,
            first_name: userData.user.first_name,
            profile_pic: userData.user.profile_pic,
            wallet: {
                balance: userData.user.wallet.balance,
            },
            transactions: userData.user.wallet.transactions,
        })
        return userData
    }

    useEffect(() => {
        if (user) {
            const response = getUser(user)
        }
    }, [user])

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    )
}

export function useCurrentUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }

    return context
}