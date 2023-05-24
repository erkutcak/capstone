'use client';

import '../styles/wallet.css';
import { useCurrentUser } from '../context/currentUserContext';

export default function MyWallet() {

  const { currentUser, setCurrentUser } = useCurrentUser();

  return (
  <div className="wallet-body">
    <img src={currentUser.profile_pic} alt={currentUser.first_name} />
    <h1>My Wallet</h1>
    <h2>Balance: 💰 {currentUser.wallet.balance}</h2>
    <h3>Last transactions: {currentUser.transactions}</h3>
  </div>
  );
}