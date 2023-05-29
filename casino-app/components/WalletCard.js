"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function WalletCard() {
    const { currentUser, setCurrentUser } = useCurrentUser();

    return (
        <div className="wallet-card">
            <img src={currentUser.profile_pic} alt={currentUser.first_name} />
            <h2>💰 {currentUser.wallet.balance}</h2>
        </div>
        )
    }