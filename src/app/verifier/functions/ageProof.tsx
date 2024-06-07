"use client";
import React, { ChangeEvent, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { PassFile } from "@/utils/interfaces";
import { initTree, ZERO_VALUE } from "@/utils/tree";
import { ethers } from "ethers";
import MerkleTree from "fixed-merkle-tree";
import { groth16, zKey } from "snarkjs";
import { useCustomToast } from "@/utils/customToast";

const AgeProof: React.FC = () => {
  const showToast = useCustomToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target?.result as string) as PassFile;
          await verify(json, showToast);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          showToast("Error", "Invalid file format", "error");
        }
        if (event.target) {
          event.target.value = "";
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Button colorScheme="red" width={"sm"} onClick={handleClick}>
        Подтвердить свой возраст
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="application/json"
      />
    </Box>
  );
};

export default AgeProof;

async function verify(
  json: PassFile,
  showToast: (title: string, description: string, status: any) => void
) {
  try {
    const { mimcSponge, hashFunction } = await initTree();

    const name = ethers.encodeBytes32String(json.firstName);
    const lastname = ethers.encodeBytes32String(json.lastName);
    const patronymic = ethers.encodeBytes32String(json.middleName);

    const countryHash = mimcSponge.multiHash([json.country]);
    const birthdayHash = mimcSponge.multiHash([json.birthDate ?? 0]);
    const passHash = mimcSponge.multiHash([json.passport]);
    const snilsHash = mimcSponge.multiHash([json.snils]);
    const nameHash = mimcSponge.multiHash([name]);
    const lastnameHash = mimcSponge.multiHash([lastname]);
    const patronymicHash = mimcSponge.multiHash([patronymic]);
    const sexHash = mimcSponge.multiHash([json.gender]);

    const tree = new MerkleTree(3, undefined, {
      hashFunction,
      zeroElement: ZERO_VALUE,
    });

    tree.insert(countryHash);
    tree.insert(birthdayHash);
    tree.insert(passHash);
    tree.insert(snilsHash);
    tree.insert(nameHash);
    tree.insert(lastnameHash);
    tree.insert(patronymicHash);
    tree.insert(sexHash);

    const merkleProof = tree.path(1);
    const now = Math.floor(Date.now() / 1000);

    const input = {
      birthdayTimestamp: json.birthDate?.toString() ?? "",
      nowTimestamp: now.toString(),
      pathElements: merkleProof.pathElements,
      pathIndices: merkleProof.pathIndices,
      root: merkleProof.pathRoot.toString(),
    };

    console.log("inputs", input);

    const wasmPath = "https://zkkyc.github.io/front/ageProof/age.wasm";
    const zkeyPath = "https://zkkyc.github.io/front/ageProof/age.zkey";

    const { proof, publicSignals } = await groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    );

    const vkey = await zKey.exportVerificationKey(zkeyPath);
    const localCheckProof = await groth16.verify(vkey, publicSignals, proof);

    if (localCheckProof)
      showToast(
        "Успех!",
        "Доказательство было создано и проверено!",
        "success"
      );
  } catch (error) {
    console.error("Verification error:", error);
    showToast(
      "Ошибка!",
      "Доказательство не удалось создать и проверить",
      "error"
    );
  }
}
