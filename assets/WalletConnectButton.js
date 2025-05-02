import { useState } from 'react';

export default function WalletConnectButton({ account, connectWallet, disconnectWallet }) {
  return (
    <div className="flex items-center gap-4">
      <button
        className="rounded-lg border-[0.75px] border-[#FFD700] bg-[#FFD700] shadow-btn-inner text-[#000000] tracking-[0.32px] h-[42px] px-2 group relative"
        onClick={account ? disconnectWallet : connectWallet}
      >
        {account ? (
          <>
            <div className="flex mr-3 items-center justify-center text-[16px] lg:text-md">
              <div className="ml-3">
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            </div>
            <div className="w-[200px] absolute right-0 top-10 hidden group-hover:block">
              <ul className="border-[0.75px] border-[#FFD700] rounded-lg bg-[#FFD700] p-2">
                <li>
                  <div
                    className="flex gap-2 items-center mb-1 text-primary-100 text-md tracking-[-0.32px]"
                    onClick={() => window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })}
                  >
                    Change Wallet
                  </div>
                </li>
                <li>
                  <div
                    className="flex gap-2 items-center text-primary-100 text-md tracking-[-0.32px]"
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </div>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center gap-1 text-md">
            Connect Wallet
          </div>
        )}
      </button>
    </div>
  );
}
