import { ethers } from "ethers";
import abi from "@/utils/zkKYC.json";
import { ZkKYC } from "@/utils/typechain-types";
import addresses from "@/utils/addresses.json";

export async function getProvider() {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();

  return { provider, signer };
}

export async function connectZKKYC() {
  const { provider, signer } = await getProvider();
  const contract = new ethers.Contract(addresses.zkKYC, abi, provider);
  const con = contract.connect(signer) as ZkKYC;

  return con;
}

export async function getAddr(): Promise<string> {
  const { signer } = await getProvider();
  return signer.address;
}
