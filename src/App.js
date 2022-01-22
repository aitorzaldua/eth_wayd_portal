import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {

  //CHECK IF THE WALLET IS CONNECTED

  //Set the wallet user to "":
  const [currentAccount, setCurrentAccount] = useState("");

  //Check if we have Metamask in the browser:
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }



      //Check if we're authorized to access the user's wallet

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
      }   catch (error) {
      console.log(error);
    }
  }

  //If the wallet is nos connected -> connect it via the button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  //This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])





  //HTML
  return (
    <div className="App">
      <header className="Header">
        <p>This is the Header</p>
        <a className="App-link" href="https://draftdigital.org"> Draft Digital</a>
      </header>
      <body className="Body">
        <p>This is the body</p>
        <button className="waveButton" onClick={null}>
          Click the button
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </body>
      <footer className="Footer">>
        <p>This is the footer</p>
      </footer>
    </div>
  );
}

export default App;
