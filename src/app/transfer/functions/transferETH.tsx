"use client";
import { Container, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { connectZKKYC, getProvider } from "@/utils/provider";
import { ethers } from "ethers";
import { useCustomToast } from "@/utils/customToast";

const TransferETH = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const showToast = useCustomToast();

  const handleTransfer = async () => {
    const fullname = name + ".sib";

    const contract = await connectZKKYC();
    const { signer } = await getProvider();
    const addr = await contract.nameToAddress(fullname);
    if (addr === ethers.ZeroAddress)
      showToast("Ошибка!", "Такое имя не зарегистрировано", "error");
    else {
      try {
        await signer.sendTransaction({
          to: addr,
          value: ethers.parseUnits(amount, "ether"),
        });
      } catch (e) {
        console.log(e);
        showToast("Ошибка!", "Ошибка перевода", "error");
      }
    }
    console.log("Addr:", addr);
    console.log("Name:", fullname);
    console.log("Amount:", amount);
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Удаляем спец. символы
    setName(value);
  };

  const handleAmountChange = (e: any) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]*[.,]?[0-9]{0,8}$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <Container>
      <Input
        placeholder="Имя"
        className="my-3"
        value={name}
        onChange={handleNameChange}
      />
      {name && <div className="my-3">{name}.sib</div>}
      <Input
        placeholder="Сумма перевода"
        type="text"
        className="my-3"
        value={amount}
        onChange={handleAmountChange}
      />
      <Button colorScheme="red" className="my-3" onClick={handleTransfer}>
        Перевести
      </Button>
    </Container>
  );
};

export default TransferETH;
