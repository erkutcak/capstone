"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function WheelOfCoins() {
    const { currentUser, setCurrentUser } = useCurrentUser();

    return (
        <div className="coin-wheel">
            wheel of coins here
        </div>
        )
    }