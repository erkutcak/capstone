"use client";

import { useCurrentUser } from '@/app/context/currentUserContext';
import '../app/styles/slots.css'
import Spinner from './Spinner';
import React, { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RepeatButton({ onClick }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    return (
    <button
        aria-label='Play again.' 
        id='repeatButton' 
        onClick={onClick}
        disabled = {isButtonDisabled}
    >SPIN!</button>
    );
}

function WinningSound() {
    return (
        <audio autoPlay className="player" preload="false">
        <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
        </audio>  
    );
}

function SlotMachine({setIsButtonDisabled}) {
    const [winner, setWinner] = useState(null);
    const child1Ref = useRef();
    const child2Ref = useRef();
    const child3Ref = useRef();
    const { currentUser, setCurrentUser } = useCurrentUser();
    const searchParams = useSearchParams()
    const gameId = searchParams.get('id');

    const loser = [
        '😬 Not quite 😬', 
        '🛑 Stop gambling 🛑', 
        '😔 Hey, you lost! 😔', 
        '🤕 Ouch! I felt that 🤕',      
        '👊🏼 Don\'t beat yourself up 👊🏼',
        '💸 There goes the college fund 💸',
        '😿 I have a cat. You have a loss 😿',
        '👍🏼 You\'re awesome at losing 👍🏼',
        '👷🏼 Coding is hard 👷🏼',
        '🤬 Don\'t hate the coder 🤬'
    ];

    const matches = [];

    const handleClick = async () => { 
        if (currentUser.wallet.balance >= 50) {
            const updatedBalance = currentUser.wallet.balance - 50
            setWinner(null);
            emptyArray();
            child1Ref.current.forceUpdateHandler();
            child2Ref.current.forceUpdateHandler();
            child3Ref.current.forceUpdateHandler();
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
            transactionLose()
        } else {
            toast('Insufficient Coins! ', {
                hideProgressBar: false,
                autoClose: 4600,
                type: "error",
            });
            setIsButtonDisabled(true)
        }
    }

    const transactionWin = async () => {
        const updatedBalance = currentUser.wallet.balance + 2000
        const difference = updatedBalance - currentUser.wallet.balance
        await fetch('/api/addTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                difference,
                walletId: currentUser.wallet.id,
                wallet: currentUser.wallet,
                gameId: gameId,
            }),
        });
    }

    const transactionLose = async () => {
        const updatedBalance = currentUser.wallet.balance - 50
        const difference = updatedBalance - currentUser.wallet.balance
        await fetch('/api/addTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                difference,
                walletId: currentUser.wallet.id,
                wallet: currentUser.wallet,
                gameId: gameId,
            }),
        });
    }

    const finishHandler = async (value) => {
    matches.push(value);

    if (matches.length === 3) {
        const first = matches[0];
        const results = matches.every(match => match === first);
        setWinner(results);
        if (results === true) {
            const updatedBalance = currentUser.wallet.balance + 2000
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
            transactionWin()
            toast('CONGRATULATIONS! ', {
                hideProgressBar: false,
                autoClose: 4600,
                type: "success",
            });
        }
        }
    }

    const emptyArray = () => {
        matches.length = 0;
    }

    const getLoser = () => {       
        return loser[Math.floor(Math.random() * loser.length)];
    };

    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
        repeatButton = <RepeatButton onClick={handleClick} />;
    }

    if (winner) {
        winningSound = <WinningSound />;
    }

    return (
        <div className='slots-main'>
            <ToastContainer/>
            <div className='slots-left'>
                <h1 className='slots-title'>TASTY SLOT MACHINE</h1>
                <p className='slots-bio'>Welcome to our delectable slot machine game filled with hotties and delightful surprises! Get ready to indulge in a gaming experience that combines the excitement of spinning reels with an irresistible list of tasty men.  <br /> <br />Prepare yourself for an adventure as you encounter delicious group of successful and good looking people. Each play is 50 coins.</p>
                <h2 className='slot-balance'>Current Balance: <br /> 💰{currentUser.wallet.balance}</h2>
                <h3 className='slot-balance'>Pot 💰2000</h3>
                {winningSound}
                {repeatButton}
            </div>
            <div className='slots-right'>
                <h1 className='slots-text' style={{ color: 'white' }}>
                    <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
                </h1>
                <div className='spinner-container'>
                    <Spinner onFinish={finishHandler} ref={child1Ref} timer="1000" />
                    <Spinner onFinish={finishHandler} ref={child2Ref} timer="1400" />
                    <Spinner onFinish={finishHandler} ref={child3Ref} timer="2200" />
                    <div className="gradient-fade"></div>
                </div>
            </div>
        </div>
    );
}

export default SlotMachine;


