import { connectZKKYC, getAddr } from "@/utils/provider";
import { getRandomBigInt, getCommitment, downloadJSON } from "@/utils/commons";
import { CommitmentFile } from "@/utils/interfaces";

export async function createCommit() {
  try {
    const contract = await connectZKKYC();

    const secret = getRandomBigInt(255);
    const addr = await getAddr();

    const commitment = await getCommitment(secret, addr);

    const data: CommitmentFile = {
      secret: secret.toString(),
      addr: addr,
      commitment: commitment,
    };

    downloadJSON(data, "commitment");

    await contract.createCommitment(commitment);
  } catch (error) {
    console.error("Ошибка при создании обязательства:", error);
  }
}
