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
import { RegDataToSend } from "@/utils/interfaces";

const PassProof: React.FC = () => {
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
          const json: RegDataToSend = JSON.parse(e.target?.result as string);

          verify(json, selectedField);
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

  const fields = [
    "Доказать возраст",
    "Доказать СНИЛС",
    "Доказать номер паспорта",
    "Доказать пол",
    "Доказать страну",
    "Доказать ФИО",
  ];

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

function verify(json: RegDataToSend, selectedField: string) {
  console.log("Selected Field:", selectedField);
  console.log("File Data:", json);
}
