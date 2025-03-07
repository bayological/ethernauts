import { ConnectWallet } from '../Buttons/ConnectWallet';
import { WalletInfo } from '../WalletInfo';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>EthernautDAO</h1>
      </div>
      <div className={styles.end}>
        <WalletInfo />
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;
