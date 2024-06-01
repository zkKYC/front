import { MerkleTree, Element } from "fixed-merkle-tree";
import { ethers } from "ethers";

import { ZERO_VALUE, initTree } from "@/utils/tree";
import { connectZKKYC } from "@/utils/provider";

export async function registrationHandle(dataToSend: DataToSend) {
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

  const con = await connectZKKYC();

  console.log(await con.name());
}

export interface FormData {
  evmAddress: string;
  lastName: string;
  firstName: string;
  middleName: string;
  country: string;
  snils: string;
  passport: string;
  birthDate: Date | null;
  gender: string;
}

export interface FormDataErrors {
  evmAddress: string;
  lastName: string;
  firstName: string;
  middleName: string;
  country: string;
  snils: string;
  passport: string;
  birthDate: string;
  gender: string;
}

interface DataToSend extends Omit<FormData, "birthDate"> {
  birthDate: number | null;
}
