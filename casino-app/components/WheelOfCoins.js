"use client";
import React, { useState } from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";
import { Wheel } from "react-custom-roulette";

export default function WheelOfCoins() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const data = [
        { option: '💰 10.000', style: { backgroundColor: 'red', textColor: 'black' }},
        { option: '💰 500', style: { backgroundColor: 'orange', textColor: 'black' }},
        { option: '💰 100.000', style: { backgroundColor: 'yellow', textColor: 'black' }},
        { option: '💰 1000', style: { backgroundColor: 'green', textColor: 'black' }},
        { option: '💰 100', style: { backgroundColor: 'blue', textColor: 'black' }},
        { option: '💰 5000', style: { backgroundColor: 'violet', textColor: 'black' }},
        { option: '💰 10', style: { backgroundColor: 'indigo', textColor: 'black' }},
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
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
        
                onStopSpinning={() => {
                    setMustSpin(false);
                    winCoins()
                    console.log(prizeNumber)
                }}
            />
            <button onClick={handleSpinClick}>SPIN</button>
        </div>
        )
    }