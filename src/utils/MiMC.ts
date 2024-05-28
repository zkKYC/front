import { MimcSponge, buildMimcSponge, mimcSpongecontract } from "circomlibjs";
import { HashFunction, Element } from "fixed-merkle-tree";

// A wrapper class for working with the merkle tree and for unrolling the hasher contract
export class MiMC {
  private mimcSponge!: MimcSponge;

  async init() {
    this.mimcSponge = await buildMimcSponge();
  }

  hash(left: Element, right: Element): string {
    if (!this.mimcSponge) {
      console.error("MimcSponge not initialized. Call init() first.");
      return "";
    }

    const k = 0;
    const mimcHash = this.mimcSponge.multiHash([left, right], k);

    return this.mimcSponge.F.toString(mimcHash);
  }

  hashFunction: HashFunction<Element> = (left, right) => {
    return this.hash(left, right);
  };

  getBytecode(): any {
    return mimcSpongecontract.createCode("mimcsponge", 220);
  }

  getABI(): any {
    return mimcSpongecontract.abi;
  }
}
