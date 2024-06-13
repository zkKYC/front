"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface Domain {
  name: string;
  hash: string;
  imageUrl: string;
  price: string;
  seller: string;
}

// Функция для сбора событий контракта (пока что заполняем данными по умолчанию)
const fetchDomainEvents = (): Domain[] => {
  return [
    {
      name: "example1.sib",
      hash: "0x00",
      imageUrl: "https://zkkyc.github.io/front/images/pass.png",
      price: "1 ETH",
      seller: "0xSellerAddress1",
    },
    {
      name: "example2.sib",
      hash: "0x01",
      imageUrl: "https://zkkyc.github.io/front/images/pass.png",
      price: "2 ETH",
      seller: "0xSellerAddress2",
    },
  ];
};

const DomainCard = ({
  name,
  hash,
  imageUrl,
  price,
  seller,
  onBuy,
}: Domain & { onBuy: (domain: Domain) => void }) => (
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    p={4}
    m={2}
  >
    <Image src={imageUrl} alt={`Image for ${name}`} boxSize="150px" mx="auto" />
    <Box p="6">
      <Box alignItems="baseline">
        <Text fontWeight="semibold" fontSize="xl">
          {name}
        </Text>
      </Box>
      <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        {hash}
      </Text>
      <Text mt="2" color="gray.500">
        Цена: {price}
      </Text>
      <Text mt="2" color="gray.500">
        Продавец: {seller}
      </Text>
      <Button
        mt={4}
        colorScheme="red"
        onClick={() => onBuy({ name, hash, imageUrl, price, seller })}
      >
        Купить это имя
      </Button>
    </Box>
  </Box>
);

const Domain = () => {
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    const events = fetchDomainEvents();
    setDomains(events);
  }, []);

  const handleBuyDomain = (domain: Domain) => {
    console.log("Покупка домена:", domain);
    // Здесь вы можете вызвать функцию контракта для покупки домена
  };

  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Предложения о покупке доменов
        </Heading>
        <Text color={"gray.500"}>Тут можно купить домен</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {domains.map((domain, index) => (
          <DomainCard key={index} {...domain} onBuy={handleBuyDomain} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Domain;
