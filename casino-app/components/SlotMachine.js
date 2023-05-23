"use client";

import '../app/styles/slots.css'
import React, { Component } from 'react';
import WinningSound from './WinningSound';
import Spinner from './Spinner';
import RepeatButton from './RepeatButton';

class SlotMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        winner: null
        };
        this.finishHandler = this.finishHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }  

    handleClick() { 
        this.setState({ winner: null });
        this.emptyArray();
        this._child1.forceUpdateHandler();
        this._child2.forceUpdateHandler();
        this._child3.forceUpdateHandler();
    }

    static loser = [
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

    static matches = [];

    finishHandler(value) {
    SlotMachine.matches.push(value);  

    if (SlotMachine.matches.length === 3) {
        const { winner } = this.state;
        const first = SlotMachine.matches[0];
        let results = SlotMachine.matches.every(match => match === first)
        this.setState({ winner: results });
    }
}

emptyArray() {
    SlotMachine.matches = [];
}

render() {
    const { winner } = this.state;
    const getLoser = () => {       
    return SlotMachine.loser[Math.floor(Math.random()*SlotMachine.loser.length)];
    };
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
    repeatButton = <RepeatButton onClick={this.handleClick} />;
    }
    
    if (winner) {
    winningSound = <WinningSound />;
    }

    return (
        <div className='slots-main'>
            <div className='slots-text'>
                {winningSound}
                <h1 className='random-text' style={{ color: 'white'}}>
                <span className='win-text'>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
                </h1>
                <div className='repeat-button'>
                    {repeatButton}          
                </div>
            </div>
            <div className= 'spinner-container'>
                <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
                <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" />
                <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" />
                <div className="gradient-fade"></div>
            </div>
        </div>
    );
    }
}

export default SlotMachine;


