"use client";
import React from "react";
import { DateTime } from "luxon";
import '../app/styles/wallet.css'

export default function TransactionCard({transaction}) {
    
    const { amount, createdAt, game} = transaction;
    const formattedDate = DateTime.fromISO(createdAt).toFormat('MM/dd/yyyy - HH:mm');

    return (
        <tr className="transaction-card">
            <td className="table-info">💰{amount}</td>
            <td className="table-info">{game.name}</td>
            <td className="table-info">{formattedDate}</td>
        </tr>
        )
    }