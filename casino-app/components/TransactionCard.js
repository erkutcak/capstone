"use client";
import React from "react";
import { DateTime } from "luxon";
import '../app/styles/wallet.css'

export default function TransactionCard({transaction}) {
    
    const { amount, createdAt, gameId} = transaction;
    const formattedDate = DateTime.fromISO(createdAt).toFormat('MM/dd/yyyy - HH:mm');

    return (
        <tr className="transaction-card">
            <td className="table-info">💰{amount}</td>
            <td className="table-info">{gameId}</td>
            <td className="table-info">{formattedDate}</td>
        </tr>
        )
    }