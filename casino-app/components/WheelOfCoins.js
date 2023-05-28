"use client";
import React, { useState } from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function WheelOfCoins() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const data = [
        { option: '💰 10.000'},
        { option: '💰 500'},
        { option: '💰 100.000'},
        { option: '💰 1000'},
        { option: '💰 100'},
        { option: '💰 5000'},
        { option: '💰 10'},
    ]

    const handleSpinClick = () => {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
        setMustSpin(true)
        setPrizeNumber(newPrizeNumber)
    }

    const winCoins = async () => {
        let updatedBalance;
            switch (prizeNumber) {
            case 0:
                updatedBalance = currentUser.wallet.balance + 10000;
                break;
            case 1:
                updatedBalance = currentUser.wallet.balance + 500;
                break;
            case 2:
                updatedBalance = currentUser.wallet.balance + 100000;
                break;
            case 3:
                updatedBalance = currentUser.wallet.balance + 1000;
                break;
            case 4:
                updatedBalance = currentUser.wallet.balance + 100;
                break;
            case 5:
                updatedBalance = currentUser.wallet.balance + 5000;
                break;
            case 6:
                updatedBalance = currentUser.wallet.balance + 10;
                break;
            default:
            }
            setCurrentUser(prevUser => ({
                ...prevUser,
                wallet: {
                    ...prevUser.wallet,
                    balance: updatedBalance
                }
            }))
            await fetch('/api/updateCoins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: currentUser.email,
                    updatedBalance,
                }),
            });
    }

    return (
        <div className="coin-wheel">
            {/* <Wheel />
            <button onClick={handleSpinClick}>SPIN</button> */}
        </div>
        )
    }