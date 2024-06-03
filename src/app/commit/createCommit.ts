import { connectZKKYC, getAddr } from "@/utils/provider";
import { decimalToHex, toFixedHex, getRandomBigInt } from "@/utils/commons";
import { initTree } from "@/utils/tree";

export async function createCommit() {
  try {
    const { mimcSponge } = await initTree();
    const contract = await connectZKKYC();

    const secret = toFixedHex(getRandomBigInt(255));
    const addr = toFixedHex(BigInt(await getAddr()));
    const commitment = mimcSponge.multiHash([addr, secret]);

    await contract.createCommitment("0x" + decimalToHex(BigInt(commitment)));
  } catch (error) {
    console.error("Ошибка при создании обязательства:", error);
  }
}
