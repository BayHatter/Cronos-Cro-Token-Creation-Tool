import { useState } from 'react';
import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';

export default function TopMenu({ account, connectWallet, disconnectWallet }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-green-800 text-black relative">
      <div className="flex items-center gap-2">
        <Link href="/">
          <a className="text-xl font-bold font-sans hover:underline">Tokens</a>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link href="/">
          <a className="px-4 py-2 rounded-md bg-blue-300 font-bold hover:bg-blue-400">Home</a>
        </Link>
        <Link href="/eth">
          <a className="px-4 py-2 rounded-md bg-blue-300 font-bold hover:bg-blue-400">Create Coin</a>
        </Link>

        <div className="flex items-center px-4 py-2 rounded-md bg-green-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-[blink_1s_infinite]"></div>
            <span className="font-bold">MetaMask</span>
          </div>
        </div>

        <WalletConnectButton account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-green-800 text-black w-full px-4 py-2 md:hidden z-50">
          <Link href="/">
            <a className="block py-2 px-4 rounded-md bg-blue-300 font-bold hover:bg-blue-400">Home</a>
          </Link>
          <Link href="/eth">
            <a className="block py-2 px-4 rounded-md bg-blue-300 font-bold hover:bg-blue-400">Create Coin</a>
          </Link>
          <div className="mt-4">
            <WalletConnectButton account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
          </div>
        </div>
      )}
    </nav>
  );
}
