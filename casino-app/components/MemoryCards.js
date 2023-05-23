'use client';

import '../app/styles/memory.css'
import { useState, useEffect } from "react";
import pic1 from '../public/1.jpeg';
import pic2 from '../public/2.png';
import pic3 from '../public/3.png';
import pic4 from '../public/4.jpeg';
import pic5 from '../public/5.jpg';
import pic6 from '../public/6.jpeg';
import pic7 from '../public/7.jpeg';
import pic8 from '../public/8.jpeg';
import Image from 'next/image';

const board = [
<Image className='card-img' src={pic1}/>, 
<Image className='card-img' src={pic2}/>, 
<Image className='card-img' src={pic3}/>, 
<Image className='card-img' src={pic4}/>, 
<Image className='card-img' src={pic5}/>, 
<Image className='card-img' src={pic6}/>, 
<Image className='card-img' src={pic7}/>, 
<Image className='card-img' src={pic8}/>
];

export default function MemoryCards() {

    const [boardData, setBoardData] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        if (matchedCards.length == 16){
        setGameWon(true);
        } else if (moves === 28) {
        setGameOver(true);
        }
    }, [moves]);

    const initialize = () => {
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

    return (
    <div className="container">
    <div className='left-container'>
        <div className="menu">
            <p>{`Moves - ${moves}`} / 28</p>
        </div>
        <div className="menu">
                {gameOver === true ? <h3>GAME OVER!</h3> : null}
                {gameWon === true ? <h3>CONGRATULATIONS!</h3> : null}
        </div>
        <button onClick={() => initialize()} className="reset-btn">
        Reset
        </button>
    </div>
        <div className="board">
            {boardData.map((data, i) => {
            const flipped = flippedCards.includes(i) ? true : false;
            const matched = matchedCards.includes(i) ? true : false;
            return (
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
            );
            })}
        </div>
    </div>
    );
}