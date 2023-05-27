import React from "react"
import styles from "../app/styles/Status.module.css"
import { useCurrentUser } from "@/app/context/currentUserContext";

const Status = ({message}) => {
  const { currentUser, setCurrentUser } = useCurrentUser();

  return (
    <div className={styles.statusContainer}>
      <div className={styles.status}>
        <h1 className={styles.value}>{message}</h1>
      </div>
      <div className={styles.balance}>
        <h1 className={styles.value}>💰 {currentUser.wallet.balance}</h1>
      </div>
    </div>
  )
}

export default Status
