'use client';

import '../styles/wallet.css';
import { useCurrentUser } from '../context/currentUserContext';

export default function MyWallet() {

  const currentUser = useCurrentUser();

  return (
  <div className="wallet-body">Wallet
    <p>{currentUser.wallet.balance}</p>
  </div>
  );
}