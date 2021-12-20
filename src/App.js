import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

// contract address của greeter khi deploy
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreetingValue] = useState();

  // yêu cầu truy xuất account MetaMask
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // gọi smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum != 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)

      try {
        const data = await contract.greet();
        console.log('data: ', data)
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <button onClick={fetchGreeting}>Fetch Greeting</button>
        </div>
      </header>



    </div>
  );
}

export default App;
