"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function TransactionCard({transaction}) {
    
    const { amount, createdAt, gameId} = transaction;

    return (
        <div className="transaction-card">
            <h3>{amount}</h3>
            <h3>{gameId}</h3>
            <h3>{createdAt}</h3>
        </div>
        )
    }