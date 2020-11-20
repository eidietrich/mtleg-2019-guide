import { Link } from 'gatsby'
import React from "react"

import MTFPLogo from './MTFPLogo'

import styles from './header.module.css'

const Header = () => (
  <header>
    <MTFPLogo />
    <div className={styles.linkContainer}>
      <Link className={styles.headerLink} to={`/`}>Tracking MTLeg 2019</Link>
      <Link className={styles.headerLink} to={`/lawmakers`}>✓Lawmakers</Link>
      <Link className={styles.headerLink} to={`/bills`}>✓Bills</Link>
      <Link className={styles.headerLink} to={`/governor`}>✓Gov. action</Link>

      
    </div>
  </header>
)

export default Header
