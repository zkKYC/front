import { MerkleTree } from "fixed-merkle-tree";
import { ethers } from "ethers";

import { ZERO_VALUE, initTree } from "@/utils/tree";
import { connectZKKYC } from "@/utils/provider";
import { decimalToHex, downloadJSON } from "@/utils/commons";
import { RegDataToSend, PassFile } from "@/utils/interfaces";

export async function registrationHandle(dataToSend: RegDataToSend) {
  const { hashFunction, mimc, mimcSponge } = await initTree();
  const tree = new MerkleTree(3, undefined, {
    hashFunction,
    zeroElement: ZERO_VALUE,
  });

  const countryHash = mimcSponge.multiHash([dataToSend.country]);
  const birthDateHash = mimcSponge.multiHash([dataToSend.birthDate as number]);
  const passportHash = mimcSponge.multiHash([dataToSend.passport]);
  const snilsHash = mimcSponge.multiHash([dataToSend.snils]);
  const firstNameHash = mimcSponge.multiHash([
    ethers.encodeBytes32String(dataToSend.firstName),
  ]);
  const lastNameHash = mimcSponge.multiHash([
    ethers.encodeBytes32String(dataToSend.lastName),
  ]);
  const middleNameHash = mimcSponge.multiHash([
    ethers.encodeBytes32String(dataToSend.middleName),
  ]);
  const genderHash = mimcSponge.multiHash([dataToSend.gender]);

  tree.insert(countryHash);
  tree.insert(birthDateHash);
  tree.insert(passportHash);
  tree.insert(snilsHash);
  tree.insert(firstNameHash);
  tree.insert(lastNameHash);
  tree.insert(middleNameHash);
  tree.insert(genderHash);

  const contract = await connectZKKYC();

  const root = "0x" + decimalToHex(BigInt(tree.root));

  //await contract.setPass(dataToSend.evmAddress, root);

  const data: PassFile = dataToSend as PassFile;
  data.root = root;

  downloadJSON(data, "pass");
}
