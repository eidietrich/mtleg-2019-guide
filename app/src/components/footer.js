import React from "react"

import styles from './footer.module.css'

import MTFPLogo from './MTFPLogo'
import EmailForm from './EmailForm'

const Footer = () => (
    <footer className={styles.footer}>
        <h2><a href="https://www.montanafreepress.org/donate/">Support this work</a></h2>
        <p>As a nonprofit news site, we rely on reader support to make projects like this possible.</p>
        <p>You can donate <a href="https://www.montanafreepress.org/donate/">here</a>.</p>
        <br />
        <EmailForm />
        <MTFPLogo />
    </footer>
)

export default Footer
