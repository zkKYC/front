"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Metamask from "../../metamask";
import { signMessage } from "@/utils/sign";

interface ClientStatus {
  isConnected: boolean;
  address?: string;
}

const Button = () => {
  const [haveMetamask, sethaveMetamask] = useState<boolean>(true);
  const [clientStatus, setClientStatus] = useState<ClientStatus>({
    isConnected: false,
  });

  const checkConnection = async () => {
    const { ethereum } = window as any;
    if (ethereum) {
      sethaveMetamask(true);

      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setClientStatus({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setClientStatus({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    //console.log("In ConnectWeb3: Start");
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      //console.log("In ConnectWeb3: After")
      //provider = new ethers.providers.Web3Provider((window as any).ethereum);

      setClientStatus({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    // <button className="h-12 rounded-lg bg-black font-bold px-5">Connect</button>
    <div>
      {!haveMetamask ? (
        <Metamask />
      ) : clientStatus.isConnected ? (
        <span className="flex items-center h-12 px-5 rounded-lg bg-black font-bold text-white">
          <h2>{clientStatus.address} ✅</h2>
        </span>
      ) : (
        <>
          <button
            className="h-12 rounded-lg bg-black font-bold text-white px-5"
            onClick={connectWeb3}
          >
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
};
export default Button;
