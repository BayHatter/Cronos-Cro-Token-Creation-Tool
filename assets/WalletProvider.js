import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function WalletProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);

      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }).catch((error) => {
        console.error('Error fetching accounts:', error);
      });

      window.ethereum.on('accountsChanged', (newAccounts) => {
        setAccount(newAccounts[0] || null);
      });
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } else {
      console.error('MetaMask not detected. Please install it!');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return children({ provider, account, connectWallet, disconnectWallet });
}
