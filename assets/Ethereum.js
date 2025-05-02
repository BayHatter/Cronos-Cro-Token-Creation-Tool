import { useState } from 'react';
import { ethers } from 'ethers';

export default function Ethereum({ provider, account, connectWallet }) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    mintingEnabled: false,
    burningEnabled: false,
    unlimitedSupply: false,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [isUserFeePaid, setIsUserFeePaid] = useState(false);
  const [isPlatformFeePaid, setIsPlatformFeePaid] = useState(false);

  const MAIN_WEBSITE_API = 'https://appsiko.com/api/get-token-data?network=ethereum';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!provider || !account) {
      alert('Please connect your wallet!');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.supply) {
      alert('Please fill all required fields: Name, Symbol, and Supply are required!');
      return;
    }

    try {
      const signer = await provider.getSigner();

      let userWallet, userFee;
      try {
        const userConfigResponse = await fetch('/config.json');
        if (!userConfigResponse.ok) {
          throw new Error(`Failed to fetch config.json: ${userConfigResponse.status} ${userConfigResponse.statusText}`);
        }
        const userConfig = await userConfigResponse.json();
        if (!userConfig.userWallet || !userConfig.userFee) {
          throw new Error('config.json is missing required fields: userWallet and userFee');
        }
        
        if (!ethers.isAddress(userConfig.userWallet)) {
          throw new Error('Invalid userWallet address in config.json');
        }
       
        const feeValue = parseFloat(userConfig.userFee);
        if (isNaN(feeValue) || feeValue <= 0) {
          throw new Error('Invalid userFee in config.json: must be a positive number');
        }
        userWallet = userConfig.userWallet;
        userFee = userConfig.userFee;
        console.log(`Using user config: wallet=${userWallet}, fee=${userFee} ETH`);
      } catch (error) {
        throw new Error(`Failed to load user configuration: ${error.message}. Please ensure public/config.json exists and contains valid userWallet and userFee.`);
      }

      const userFeeTx = await signer.sendTransaction({
        to: userWallet,
        value: ethers.parseEther(userFee), 
      });
      await userFeeTx.wait();
      setIsUserFeePaid(true);
      alert('User fee transaction sent. Paying platform fee...');

      let tokenDataResponse;
      try {
        tokenDataResponse = await fetch(MAIN_WEBSITE_API);
      } catch (fetchError) {
        throw new Error(`Failed to connect to the API: ${fetchError.message}. Please check your network or try again later.`);
      }

      if (!tokenDataResponse.ok) {
        throw new Error(`API responded with status ${tokenDataResponse.status}: ${await tokenDataResponse.text()}`);
      }

      const { tokenABI, tokenBytecode, platformFee, platformWallet } = await tokenDataResponse.json();

      const platformFeeTx = await signer.sendTransaction({
        to: platformWallet,
        value: ethers.parseEther(platformFee), 
      });
      await platformFeeTx.wait();
      setIsPlatformFeePaid(true);
      alert('Platform fee transaction sent. Initiating contract deployment...');

      const factory = new ethers.ContractFactory(tokenABI, tokenBytecode, signer);
      const contract = await factory.deploy(
        formData.name,
        formData.symbol,
        ethers.parseUnits(formData.supply, 18),
        account
      );

      await contract.waitForDeployment();
      const deployedAddress = await contract.getAddress();
      setContractAddress(deployedAddress);
      setShowPopup(true);
    } catch (error) {
      console.error('Error during transactions:', error);
      if (!isUserFeePaid) {
        alert(`Failed to pay user fee: Insufficient Funds`);
      } else if (!isPlatformFeePaid) {
        alert(`Failed to pay platform fee: Insufficient Funds`);
      } else {
        alert(`Failed to deploy token: ${error.message}`);
      }
      setIsUserFeePaid(false);
      setIsPlatformFeePaid(false);
    }
  };

  const handleViewToken = () => {
    if (contractAddress) {
      const etherscanUrl = `https://etherscan.io/token/${contractAddress}`;
      window.open(etherscanUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-background">
      <h1 className="text-3xl font-bold font-sans text-black mb-6 text-center animate-fadeIn">
        Create Your Ethereum Token
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 rounded-xl shadow-card p-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black font-bold font-sans mb-1">Token Name *</label>
            <input
              type="text"
              placeholder="e.g., My Token"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 transition duration-200 font-sans"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black font-bold font-sans mb-1">Token Symbol *</label>
            <input
              type="text"
              placeholder="e.g., MYTOKEN"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 transition duration-200 font-sans"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-black font-bold font-sans mb-1">Initial Supply *</label>
          <input
            type="number"
            placeholder="e.g., 10000"
            value={formData.supply}
            onChange={(e) => setFormData({ ...formData, supply: e.target.value || '' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 transition duration-200 font-sans"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.mintingEnabled}
              onChange={(e) => setFormData({ ...formData, mintingEnabled: e.target.checked })}
              className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-black font-bold font-sans">Enable Minting (Optional)</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.burningEnabled}
              onChange={(e) => setFormData({ ...formData, burningEnabled: e.target.checked })}
              className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-black font-bold font-sans">Enable Burning (Optional)</label>
          </div>
          <div classPolice="flex items-center">
            <input
              type="checkbox"
              checked={formData.unlimitedSupply}
              onChange={(e) => setFormData({ ...formData, unlimitedSupply: e.target.checked })}
              className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-black font-bold font-sans">Enable Unlimited Supply (Requires Minting) (Optional)</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-300 text-black font-bold font-sans py-3 rounded-md hover:bg-blue-400 transition duration-200"
        >
          Create Token
        </button>
      </form>

      <div className="mt-6 p-6 bg-muted rounded-xl animate-fadeIn">
        <h2 className="text-2xl font-bold font-sans text-black mb-4 relative">
          How to Create Your Token on the Ethereum Blockchain
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-green-800 animate-fadeIn"></span>
        </h2>
        <p className="text-black font-bold font-sans leading-relaxed mb-4">
          Follow These Simple Steps To Create Meme Coin At Ethereum Within 10 - 30 Seconds:
        </p>
        <ol className="list-decimal list-inside text-black font-sans font-bold space-y-2">
          <li>First Connect Your Metamask Wallet By Using Above Right Side Connect Button.</li>
          <li>
            Switch Your MetaMask Network to Ethereum. If The Ethereum Network Isn’t Showing On Metamask, You Can Add It As Your Custom Network. You Can Visit This Link For Getting RPC, Chain Id etc. Details <a href="https://chainlist.org/chain/1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://chainlist.org/chain/1</a>, After Getting These Values You Can Add It As Custom Network.
          </li>
          <li>Fill Up The Form With Token Name, Symbol, Token Supply, These Are The Required Things. (Minting, Enable and Unlimited Supply) optional</li>
          <li>Once Ready, Press the "Create Token" Button. This Will Prompt MetaMask To Initiate Three Transactions: (1) User Fee, (2) Platform Fee, (3) Contract Deployment. Approve Each to Proceed.</li>
          <li>If Your Token Is Successfully Created, A "View Token" Button Will Appear. Click It, It Will Take You To Blockchain From Where You Can Confirm Your Meme Coin Is Created.</li>
          <li>Congratulations! You Are Now The Proud Owner of Your Very Own Meme Coin.</li>
          <li>
            Your Meme Coin Will Appear At MetaMask, You Can Now Do Anything With Your Meme Coin, You Are The Owner of This Meme Coin, If MetaMask Doesn't Show Your Memecoin You Can Open MetaMask And Click At Import Token, Just Paste Your Memecoin Contract And It Will Show There.
          </li>
        </ol>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">Token Created Successfully!</h2>
            <button
              onClick={handleViewToken}
              className="bg-blue-300 text-black font-bold font-sans px-6 py-2 rounded-md hover:bg-blue-400 transition duration-200"
            >
              View Token
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="ml-4 text-black font-bold font-sans hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
