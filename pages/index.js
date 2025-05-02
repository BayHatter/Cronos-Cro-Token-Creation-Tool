import WalletProvider from '@/assets/WalletProvider';
import TopMenu from '@/assets/TopMenu';
import HomePage from '@/assets/Home';

export default function Home() {
  return (
    <WalletProvider>
      {({ provider, account, connectWallet, disconnectWallet }) => (
        <>
          <TopMenu account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
          <HomePage provider={provider} account={account} connectWallet={connectWallet} />
        </>
      )}
    </WalletProvider>
  );
}
