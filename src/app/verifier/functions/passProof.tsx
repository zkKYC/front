"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  VStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { PassFile } from "@/utils/interfaces";
import { initTree, ZERO_VALUE } from "@/utils/tree";
import { ethers } from "ethers";
import MerkleTree from "fixed-merkle-tree";
import { CircuitSignals, groth16, zKey } from "snarkjs";
import { useCustomToast } from "@/utils/customToast";

const fields = [
  "Доказать возраст",
  "Доказать СНИЛС",
  "Доказать номер паспорта",
  "Доказать пол",
  "Доказать страну",
  //"Доказать ФИО",
];

const PassProof: React.FC = () => {
  const showToast = useCustomToast();

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!selectedField) {
      setHasError(true);
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json: PassFile = JSON.parse(e.target?.result as string);

          verify(json, selectedField, showToast);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        if (event.target) {
          event.target.value = "";
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    if (!selectedField) {
      setHasError(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleCheckboxChange = (field: string) => {
    setSelectedField(field);
    setHasError(false);
  };

  return (
    <Box>
      <FormControl isInvalid={hasError}>
        <VStack align="start" spacing={2}>
          {fields.map((field, index) => (
            <Checkbox
              key={index}
              isChecked={selectedField === field}
              onChange={() => handleCheckboxChange(field)}
              colorScheme="red"
            >
              {field}
            </Checkbox>
          ))}
        </VStack>
        {hasError && (
          <FormErrorMessage>Выберите одно из полей.</FormErrorMessage>
        )}
      </FormControl>
      <Button colorScheme="red" width={"sm"} onClick={handleClick} mt={4}>
        Загрузить паспорт
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

export default PassProof;

async function verify(
  json: PassFile,
  selectedField: string,
  showToast: (title: string, description: string, status: any) => void
) {
  let value,
    index = 0;

  switch (selectedField) {
    case fields[0]:
      value = json.birthDate;
      index = 1;
      break;
    case fields[1]:
      value = json.snils;
      index = 3;
      break;
    case fields[2]:
      value = json.passport;
      index = 2;
      break;
    case fields[3]:
      value = json.gender;
      index = 7;
      break;
    case fields[4]:
      value = json.country;
      index = 0;
      break;
    default:
      break;
  }

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

    const merkleProof = tree.path(index);

    const input = {
      root: merkleProof.pathRoot.toString(),
      value: value,
      pathElements: merkleProof.pathElements,
      pathIndices: merkleProof.pathIndices,
    };

    console.log("inputs", input);

    const wasmPath =
      "https://zkkyc.github.io/front/attributeProof/attribute.wasm";
    const zkeyPath =
      "https://zkkyc.github.io/front/attributeProof/attribute.zkey";

    // const wasmPath = "./attributeProof/attribute.wasm";
    // const zkeyPath = "./attributeProof/attribute.zkey";

    const { proof, publicSignals } = await groth16.fullProve(
      input as CircuitSignals,
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
