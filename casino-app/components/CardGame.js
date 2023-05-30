'use client'

import '../app/styles/cardgame.css';
import React, { useState, useEffect } from "react"
import Status from "./Status"
import Controls from "./Controls"
import Hand from "./Hand"
import jsonData from "../deck.json"
import { useCurrentUser } from '@/app/context/currentUserContext';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const CardGame = () => {
    let GameState

    ;(function(GameState) {
        GameState[(GameState["bet"] = 0)] = "bet"
        GameState[(GameState["init"] = 1)] = "init"
        GameState[(GameState["userTurn"] = 2)] = "userTurn"
        GameState[(GameState["dealerTurn"] = 3)] = "dealerTurn"
    })(GameState || (GameState = {}))

    let Deal

    ;(function(Deal) {
        Deal[(Deal["user"] = 0)] = "user"
        Deal[(Deal["dealer"] = 1)] = "dealer"
        Deal[(Deal["hidden"] = 2)] = "hidden"
    })(Deal || (Deal = {}))

    let Message

    ;(function(Message) {
        Message["bet"] = "BLACKJACK"
        Message["hitStand"] = "Hit or Stand?"
        Message["bust"] = "Bust!"
        Message["userWin"] = "You Win!"
        Message["dealerWin"] = "Dealer Wins!"
        Message["tie"] = "Tie!"
    })(Message || (Message = {}))

    const { currentUser, setCurrentUser } = useCurrentUser();
    const searchParams = useSearchParams()
    const gameId = searchParams.get('id');
    const data = JSON.parse(JSON.stringify(jsonData.cards))
    const [deck, setDeck] = useState(data)

    const [userCards, setUserCards] = useState([])
    const [userScore, setUserScore] = useState(0)
    const [userCount, setUserCount] = useState(0)

    const [dealerCards, setDealerCards] = useState([])
    const [dealerScore, setDealerScore] = useState(0)
    const [dealerCount, setDealerCount] = useState(0)

    const [bet, setBet] = useState(0)

    const [gameState, setGameState] = useState(GameState.bet)
    const [message, setMessage] = useState(Message.bet)
    const [buttonState, setButtonState] = useState({
        hitDisabled: false,
        standDisabled: false,
        resetDisabled: true
    })

    useEffect(() => {
        if (gameState === GameState.init) {
        drawCard(Deal.user)
        drawCard(Deal.hidden)
        drawCard(Deal.user)
        drawCard(Deal.dealer)
        setGameState(GameState.userTurn)
        setMessage(Message.hitStand)
        }
    }, [gameState])

    useEffect(() => {
        calculate(userCards, setUserScore)
        setUserCount(userCount + 1)
    }, [userCards])

    useEffect(() => {
        calculate(dealerCards, setDealerScore)
        setDealerCount(dealerCount + 1)
    }, [dealerCards])

    useEffect(() => {
        if (gameState === GameState.userTurn) {
        if (userScore === 21) {
            buttonState.hitDisabled = true
            setButtonState({ ...buttonState })
        } else if (userScore > 21) {
            bust()
            console.log('test');
            loseCoins()
            transactionLose()
        }
        }
    }, [userCount])

    useEffect(() => {
        if (gameState === GameState.dealerTurn) {
        if (dealerScore >= 17) {
            checkWin()
        } else {
            drawCard(Deal.dealer)
        }
        }
    }, [dealerCount])

    const resetGame = () => {
        console.clear()
        setDeck(data)

        setUserCards([])
        setUserScore(0)
        setUserCount(0)

        setDealerCards([])
        setDealerScore(0)
        setDealerCount(0)

        setBet(0)

        setGameState(GameState.bet)
        setMessage(Message.bet)
        setButtonState({
            hitDisabled: false,
            standDisabled: false,
            resetDisabled: true
        })
    }

    const placeBet = amount => {
        setBet(amount)
        setCurrentUser({...currentUser, wallet: {...currentUser.wallet, balance: Math.round((currentUser.wallet.balance - amount) * 100) / 100}})
        setGameState(GameState.init)
    }

    const drawCard = dealType => {
        if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length)
        const card = deck[randomIndex]
        deck.splice(randomIndex, 1)
        setDeck([...deck])
        console.log("Remaining Cards:", deck.length)
        switch (card.suit) {
            case "spades":
            dealCard(dealType, card.value, "♠")
            break
            case "diamonds":
            dealCard(dealType, card.value, "♦")
            break
            case "clubs":
            dealCard(dealType, card.value, "♣")
            break
            case "hearts":
            dealCard(dealType, card.value, "♥")
            break
            default:
            break
        }
        } else {
        alert("All cards have been drawn")
        }
    }

    const dealCard = (dealType, value, suit) => {
        switch (dealType) {
        case Deal.user:
            userCards.push({ value: value, suit: suit, hidden: false })
            setUserCards([...userCards])
            break
        case Deal.dealer:
            dealerCards.push({ value: value, suit: suit, hidden: false })
            setDealerCards([...dealerCards])
            break
        case Deal.hidden:
            dealerCards.push({ value: value, suit: suit, hidden: true })
            setDealerCards([...dealerCards])
            break
        default:
            break
        }
    }

    const revealCard = () => {
        dealerCards.filter(card => {
        if (card.hidden === true) {
            card.hidden = false
        }
        return card
        })
        setDealerCards([...dealerCards])
    }

    const calculate = (cards, setScore) => {
        let total = 0
        cards.forEach(card => {
        if (card.hidden === false && card.value !== "A") {
            switch (card.value) {
            case "K":
                total += 10
                break
            case "Q":
                total += 10
                break
            case "J":
                total += 10
                break
            default:
                total += Number(card.value)
                break
            }
        }
        })
        const aces = cards.filter(card => {
        return card.value === "A"
        })
        aces.forEach(card => {
        if (card.hidden === false) {
            if (total + 11 > 21) {
            total += 1
            } else if (total + 11 === 21) {
            if (aces.length > 1) {
                total += 1
            } else {
                total += 11
            }
            } else {
            total += 11
            }
        }
        })
        setScore(total)
    }

    const hit = () => {
        drawCard(Deal.user)
    }

    const stand = () => {
        buttonState.hitDisabled = true
        buttonState.standDisabled = true
        buttonState.resetDisabled = false
        setButtonState({ ...buttonState })
        setGameState(GameState.dealerTurn)
        revealCard()
    }

    const bust = () => {
        buttonState.hitDisabled = true
        buttonState.standDisabled = true
        buttonState.resetDisabled = false
        setButtonState({ ...buttonState })
        setMessage(Message.bust)
    }

    const winCoins = async () => {
        const updatedBalance = currentUser.wallet.balance + bet * 2
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
            const updatedBalance = currentUser.wallet.balance - bet * 1
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
        const updatedBalance = currentUser.wallet.balance + bet * 2
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
        const updatedBalance = currentUser.wallet.balance - bet * 1
        const difference = updatedBalance - currentUser.wallet.balance
        console.log("difference:", difference);
        console.log("updated balance:", updatedBalance);
        console.log("currentuserbalance:", currentUser.wallet.balance);
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

    const checkWin = () => {
        console.log('test');
        if (userScore > dealerScore || dealerScore > 21) {
        //   setBalance(Math.round((currentUser.wallet.balance + bet * 2) * 100) / 100)
        setCurrentUser({...currentUser, wallet: {...currentUser.wallet, balance: Math.round((currentUser.wallet.balance + bet * 2) * 100) / 100}})
        setMessage(Message.userWin)
        winCoins()
        transactionWin()
        } else if (dealerScore > userScore) {
        setMessage(Message.dealerWin)
        loseCoins()
        transactionLose()
        } else {
        //   setBalance(Math.round((currentUser.wallet.balance + bet * 1) * 100) / 100)
        setCurrentUser({...currentUser, wallet: {...currentUser.wallet, balance: Math.round((currentUser.wallet.balance + bet * 1) * 100) / 100}})
        setMessage(Message.tie)
        }
    }

    return (
        <div className='cardgame-main'>
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
            <Status message={message}/>
            <Controls
                balance={currentUser.wallet.balance}
                gameState={gameState}
                buttonState={buttonState}
                betEvent={placeBet}
                hitEvent={hit}
                standEvent={stand}
                resetEvent={resetGame}
            />
        </motion.div>
        <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1.9,
                delay: 1.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
        <div className='table-container'>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.9,
                    delay: 1.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
            </motion.div>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.9,
                    delay: 1.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <Hand title={`Your Hand (${userScore})`} cards={userCards} />
            </motion.div>
        </div>
        </motion.div>
        </div>
    )
}

export default CardGame;
