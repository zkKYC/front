import { HashFunction, Element } from "fixed-merkle-tree";
import { MiMC } from "./MiMC";
import { MiMCSponge } from "./MiMCSponge";

export const ZERO_VALUE =
  "21663839004416932945382355908790599225266501822907911457504978515578255421292";

export async function initTree() {
  const mimcSponge = new MiMCSponge();
  await mimcSponge.init();
  const mimc = new MiMC();
  await mimc.init();

  const hashFunction: HashFunction<Element> = (left, right) => {
    return mimc.hash(left, right);
  };

  return { hashFunction, mimc, mimcSponge };
}
