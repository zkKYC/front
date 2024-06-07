"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { CommitmentFile } from "@/utils/interfaces";

const Commitment: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          verify(json);
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
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Button colorScheme="red" width={"sm"} onClick={handleClick}>
        Подвердить прохождение KYC
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

export default Commitment;

function verify(json: CommitmentFile) {
  console.log(json.addr);
}
