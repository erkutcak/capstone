"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function TransactionCard() {
    const { currentUser, setCurrentUser } = useCurrentUser();

    return (
        <div className="transaction-card">
            <img src={currentUser.profile_pic} alt={currentUser.first_name} />
            <h1>My Wallet</h1>
            <h2>Balance: 💰 {currentUser.wallet.balance}</h2>
        </div>
        )
    }