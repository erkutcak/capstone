'use client';

import '../styles/wallet.css';
import WheelOfCoins from '@/components/WheelOfCoins';
import TransactionCard from '@/components/TransactionCard';
import WalletCard from '@/components/WalletCard';
import { useCurrentUser } from "@/app/context/currentUserContext";
import { motion } from 'framer-motion';

export default function MyWallet() {

  const { currentUser, setCurrentUser } = useCurrentUser();
    
  const displayTransactions = currentUser.transactions.reverse().map((transaction) => {
      return <TransactionCard key={transaction.id} transaction={transaction} />
  })

  return (
  <motion.div
  className="box"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
      duration: 0.5,
      delay: 0.3,
      ease: [0, 0.71, 0.2, 1.01]
  }}
  >
  <div className="wallet-body">
    <div className='wallet-left'>
      <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
      }}
      >
      <h1 className='wallet-title'>My Wallet</h1>
      <div className='wallet-details'>
        <WalletCard/>
      </div>
    </motion.div>
    </div>
    <div className='wallet-right'>
      <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
      }}
      >
      <h1 className='transactions-title'>My Transactions</h1>
      <div className='transaction-details'>
        <table className='transaction-list'>
          <thead>
                <tr className="transaction-headers">
                    <th className='table-header'>Amount</th>
                    <th className='table-header'>Game</th>
                    <th className='table-header'>Date</th>
                </tr>
          </thead>
          <tbody>
            {displayTransactions}
          </tbody>
        </table>
      </div>
      </motion.div>
    </div>
    {/* <div className='wheel-details'>
      <WheelOfCoins/>
    </div> */}
  </div>
  </motion.div>
  );
}