import { initTree } from "@/utils/tree";

export function toFixedHex(number: BigInt, length = 32) {
  let str = number.toString(16);
  while (str.length < length * 2) str = "0" + str;
  str = "0x" + str;
  return str;
}

export function shortenAddress(address: string) {
  if (address.length < 10) return address;
  return address.slice(0, 6) + "..." + address.slice(-5);
}

export function decimalToHex(decimal: bigint) {
  return decimal.toString(16);
}

export function getRandomBigInt(bits: number) {
  let randomBigInt = BigInt(0);
  for (let i = 0; i < bits; i++) {
    const randomBit = Math.random() < 0.5 ? BigInt(0) : BigInt(1);
    randomBigInt = (randomBigInt << BigInt(1)) | randomBit;
  }
  return randomBigInt;
}

export async function getCommitment(
  _secret: bigint,
  _addr: string
): Promise<string> {
  const { mimcSponge } = await initTree();

  const secret = toFixedHex(_secret);
  const addr = toFixedHex(BigInt(_addr));

  const commitment = mimcSponge.multiHash([addr, secret]);
  return "0x" + decimalToHex(BigInt(commitment));
}

export function downloadJSON(data: any, name: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
