"use client";
import { Container, Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ethers } from "ethers";
import { connectZKKYC, getProvider } from "@/utils/provider";
import abi from "@/utils/erc20abi.json";
import { useCustomToast } from "@/utils/customToast";
import { MyToken } from "@/utils/typechain-types";

const TransferERC20 = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const showToast = useCustomToast();

  const handleTransfer = async () => {
    const fullname = name + ".sib";

    const contract = await connectZKKYC();
    const { provider, signer } = await getProvider();
    const contractERC20 = new ethers.Contract(tokenAddress, abi, provider);
    const connectERC20 = contractERC20.connect(signer) as MyToken;

    const addr = await contract.nameToAddress(fullname);
    if (addr === ethers.ZeroAddress)
      showToast("Ошибка!", "Такое имя не зарегистрировано", "error");
    else {
      try {
        console.log(ethers.parseUnits(amount, "ether"));
        // TODO decimals
        await connectERC20.transfer(addr, ethers.parseUnits(amount, "ether"));
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

  const handleAmountChange = async (e: any) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]*[.,]?[0-9]{0,5}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleTokenAddressChange = async (e: any) => {
    const value = e.target.value;
    setTokenAddress(value);
    const isValid = ethers.isAddress(value);
    setIsAddressValid(isValid);

    if (isValid) {
      try {
        const { provider } = await getProvider();
        const contract = new ethers.Contract(value, abi, provider);
        const tokenName = await contract.name();
        setTokenName(tokenName);
        const tokenSymbol = await contract.symbol();
        setTokenSymbol(tokenSymbol);
      } catch (error) {
        console.error("Error fetching token name:", error);
        setTokenName("");
      }
    } else {
      setTokenName("");
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
      <Input
        placeholder="Адрес токена"
        type="text"
        className="my-3"
        value={tokenAddress}
        onChange={handleTokenAddressChange}
        isInvalid={!isAddressValid}
      />
      {!isAddressValid && (
        <Text color="red.500" className="my-3">
          Неверный адрес токена
        </Text>
      )}
      {isAddressValid && tokenName && tokenSymbol && (
        <Text color="green.500" className="my-3">
          {tokenName + " (" + tokenSymbol + ")"}
        </Text>
      )}
      <Button colorScheme="red" className="my-3" onClick={handleTransfer}>
        Перевести
      </Button>
    </Container>
  );
};

export default TransferERC20;
