'use client';

import '../styles/wallet.css';
import WheelOfCoins from '@/components/WheelOfCoins';
import TransactionCard from '@/components/TransactionCard';
import WalletCard from '@/components/WalletCard';
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function MyWallet() {

  const { currentUser, setCurrentUser } = useCurrentUser();
    
  const displayTransactions = currentUser.transactions.map((transaction) => {
      return <TransactionCard key={transaction.id} transaction={transaction} />
  })


  return (
  <div className="wallet-body">
    <div className='wallet-details'>
      <WalletCard/>
    </div>
    <div className='transaction-details'>
      <ul className='transaction-list'>transactions
        <li className='transaction-item'>
          {displayTransactions}
        </li>
      </ul>
    </div>
    <div className='wheel-details'>
      <WheelOfCoins/>
    </div>
  </div>
  );
}