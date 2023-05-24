"use client";

import { useCurrentUser } from '@/app/context/currentUserContext';
import '../app/styles/slots.css'
import Spinner from './Spinner';
import React, { useState, useRef } from 'react';


function RepeatButton({ onClick }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    return (
    <button 
        aria-label='Play again.' 
        id='repeatButton' 
        onClick={onClick}
        disabled = {isButtonDisabled}
    />
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

    const loser = [
        'Not quite', 
        'Stop gambling', 
        'Hey, you lost!', 
        'Ouch! I felt that',      
        'Don\'t beat yourself up',
        'There goes the college fund',
        'I have a cat. You have a loss',
        'You\'re awesome at losing',
        'Coding is hard',
        'Don\'t hate the coder'
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
        } else {
            alert("Insufficient funds!")
            setIsButtonDisabled(true)
        }
    }

    const finishHandler = (value) => {
    matches.push(value);

    if (matches.length === 3) {
        const first = matches[0];
        const results = matches.every(match => match === first);
        setWinner(results);
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
            <div className='slots-left'>
                {winningSound}
                <h1 style={{ color: 'white' }}>
                    <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
                </h1>
                {repeatButton}
                {currentUser.wallet.balance}
            </div>
            <div className={`spinner-container`}>
                <Spinner onFinish={finishHandler} ref={child1Ref} timer="1000" />
                <Spinner onFinish={finishHandler} ref={child2Ref} timer="1400" />
                <Spinner onFinish={finishHandler} ref={child3Ref} timer="2200" />
                <div className="gradient-fade"></div>
            </div>
        </div>
    );
}

export default SlotMachine;


