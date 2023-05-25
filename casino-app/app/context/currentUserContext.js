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
            id: '',
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
            email: userData.email,
            username: userData.username,
            first_name: userData.first_name,
            profile_pic: userData.profile_pic,
            wallet: {
                balance: userData.wallet.balance,
                id: userData.wallet.id,
            },
            transactions: userData.wallet.transactions,
        })
        return userData
    }

    useEffect(() => {
        if (user && !currentUser.email) {
            const resp = getUser(user);
        }
    }, [user]);

    const contextValue = {
        currentUser,
        setCurrentUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export function useCurrentUser() {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    if (currentUser === undefined) {
        throw new Error("Context must be used within a Provider");
    }

    return { currentUser, setCurrentUser }
}