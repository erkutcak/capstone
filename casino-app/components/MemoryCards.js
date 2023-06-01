'use client';

import '../app/styles/memory.css'
import { useState, useEffect } from "react";
import { useCurrentUser } from '@/app/context/currentUserContext';
import pic1 from '../public/1.jpeg';
import pic2 from '../public/2.png';
import pic3 from '../public/3.png';
import pic4 from '../public/4.jpeg';
import pic5 from '../public/5.jpg';
import pic6 from '../public/6.jpeg';
import pic7 from '../public/7.jpeg';
import pic8 from '../public/8.jpeg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const board = [
<Image className='card-img' src={pic1} alt='img1'/>, 
<Image className='card-img' src={pic2} alt='img2'/>, 
<Image className='card-img' src={pic3} alt='img3'/>, 
<Image className='card-img' src={pic4} alt='img4'/>, 
<Image className='card-img' src={pic5} alt='img5'/>, 
<Image className='card-img' src={pic6} alt='img6'/>, 
<Image className='card-img' src={pic7} alt='img7'/>, 
<Image className='card-img' src={pic8} alt='img8'/>
];

export default function MemoryCards() {

    const [boardData, setBoardData] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(true);
    const { currentUser, setCurrentUser } = useCurrentUser();
    const searchParams = useSearchParams()
    const gameId = searchParams.get('id');

    useEffect(() => {
        if (!showPlayButton) {
            initialize();
        }
    }, []);

    useEffect(() => {
        if (matchedCards.length == 16){
        setGameWon(true);
        toast('Congratulations! You won 💰1000! ', {
            hideProgressBar: false,
            autoClose: 4600,
            type: "success",
        });
        winCoins()
        transactionWin()
        } else if (moves === 28) {
            toast('Game Over! Try Again.', {
                hideProgressBar: false,
                autoClose: 4600,
                type: "error",
            });
            setGameOver(true);
        }
    }, [moves]);

    const winCoins = async () => {
        const updatedBalance = currentUser.wallet.balance + 1000
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

    const loseCoins = async () => {
        if (currentUser.wallet.balance >= 50) {
            const updatedBalance = currentUser.wallet.balance - 50
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
    }

    const transactionWin = async () => {
        const updatedBalance = currentUser.wallet.balance + 1000
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

    const initialize = () => {
        loseCoins();
        transactionLose();
        // addTransaction();
        shuffle();
        setGameOver(false);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
    };

    const shuffle = () => {
        const shuffledCards = [...board, ...board]
        .sort(() => Math.random() - 0.5)
        .map((v) => v);
        setBoardData(shuffledCards);
    };

    const updateActiveCards = (i) => {
    if (!flippedCards.includes(i)) {
        if (flippedCards.length == 1) {
            const firstIdx = flippedCards[0];
            const secondIdx = i;
            if (boardData[firstIdx] == boardData[secondIdx]) {
            setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
            }

            setFlippedCards([...flippedCards, i]);
        } else if (flippedCards.length == 2) {
            setFlippedCards([i]);
        } else {
            setFlippedCards([...flippedCards, i]);
        }

        setMoves((v) => v + 1);
        }
    };

    const handlePlayButtonClick = () => {
        initialize();
        setShowPlayButton(false);
    };


    return (
    <div className="container">
        <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
        >
        <div className='left-container'>
            <h1 className='ingame-title'>HALLOWEEN MEMORY</h1>
            <p className='game-intro-bio'>Welcome to a spine-chilling Halloween-themed memory card game! Get ready to test your memory skills while immersing yourself in the spirit of Halloween. <br /><br />
            Prepare to navigate through a grid of face-down cards, each hiding a unique Halloween illustration. You have 28 moves to win the game! With each turn, you'll flip over two cards, hoping to find a matching pair. Remember where each card is located, as you'll need to rely on your memory to make successful matches. Each play is 50 coins.
            </p>
            <h2 className='ingame-balance'>Current Balance: <br /> 💰{currentUser.wallet.balance}</h2>
            <h3 className='ingame-balance'>Pot 💰1000</h3>
            <div className="menu">
            </div>
                <p className='moves-left'>Moves Left: <br/>{moves} / 28</p>
            <div className="menu">
                    {gameWon === true ? <h3 className='congrats'>CONGRATULATIONS!</h3> : null}
            </div>
            {showPlayButton ? (
                <button onClick={handlePlayButtonClick} className="play-btn">
                    P L A Y
                    <div id="clip">
                        <div id="leftTop" class="corner"></div>
                        <div id="rightBottom" class="corner"></div>
                        <div id="rightTop" class="corner"></div>
                        <div id="leftBottom" class="corner"></div>
                    </div>
                    <span id="rightArrow" class="arrow"></span>
                    <span id="leftArrow" class="arrow"></span>
                </button>
            ) : (
                <button onClick={initialize} className="play-btn">
                    R E S E T
                    <div id="clip">
                        <div id="leftTop" class="corner"></div>
                        <div id="rightBottom" class="corner"></div>
                        <div id="rightTop" class="corner"></div>
                        <div id="leftBottom" class="corner"></div>
                    </div>
                    <span id="rightArrow" class="arrow"></span>
                    <span id="leftArrow" class="arrow"></span>
                </button>
            )}
            
        </div>
        </motion.div>
                <ToastContainer/>
            <div className="board">
                {boardData.map((data, i) => {
                    const flipped = flippedCards.includes(i) ? true : false;
                const matched = matchedCards.includes(i) ? true : false;
                return (
                    <motion.div
                        className="box"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                    <div
                    onClick={() => {
                        updateActiveCards(i);
                    }}
                    key={i}
                    className={`card ${flipped || matched ? "active" : ""} ${
                        matched ? "matched" : ""
                    } ${gameOver ? "gameover" : ""}`}
                    >
                    <div className="card-front">{data}</div>
                    <div className="card-back"></div>
                    </div>
                </motion.div>
                );
                })}
            </div>
    </div>
    );
}