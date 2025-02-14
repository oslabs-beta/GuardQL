import React from 'react';
import * as styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <div className={styles.topBorder}>
      <footer className={styles.footer}>
        <p>&copy; 2025 <span>GuardQL</span>. Partnered with <a href='https://www.opensourcelabs.io/'>OSLabs</a>.</p>
        <p>Licensed under <a href='https://github.com/oslabs-beta/GuardQL/blob/dev/LICENSE.txt'>MIT</a>.</p>
      </footer>
    </div>
  )
};

export default Footer;
