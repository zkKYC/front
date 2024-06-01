import { ethers } from "ethers";
import abi from "@/utils/zkKYC.json";
import { ZkKYC } from "@/utils/typechain-types";

export async function getProvider() {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();

  return { provider, signer };
}

export async function connectZKKYC() {
  const { provider, signer } = await getProvider();
  const contract = new ethers.Contract(
    "0xaE467beb764211a09CE7DdAc262e441cf883F843",
    abi,
    provider
  );
  const con = contract.connect(signer) as ZkKYC;

  return con;
}


