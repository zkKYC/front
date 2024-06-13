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
import { connectZKKYC } from "@/utils/provider";
import { shortenAddress, timestampToDate } from "@/utils/commons";
import { ethers } from "ethers";

interface Domain {
  name: string;
  hash: string;
  fullhash: string;
  imageUrl: string;
  price: string;
  seller: string;
  time: string;
}

const fetchDomainEvents = async (): Promise<Domain[]> => {
  const contract = await connectZKKYC();
  const sellOfferEvent = contract.filters.SellOffer();
  const events = await contract.queryFilter(sellOfferEvent);

  const len = events.length;

  let domains: Domain[] = [];

  for (let i = 0; i < len; i++) {
    const isOffer = await contract.offers(events[i].args[0]);

    console.log(isOffer);

    if (isOffer[1] !== ethers.ZeroAddress) {
      const owner = await contract.nameToAddress(events[i].args[2]);
      const { expires } = await contract.records(events[i].args[0]);
      const date = timestampToDate(expires);

      domains.push({
        name: events[i].args[2],
        hash: shortenAddress(events[i].args[0]),
        fullhash: events[i].args[0],
        imageUrl: "https://zkkyc.github.io/front/images/pass.png",
        price: ethers.formatEther(events[i].args[1]),
        seller: shortenAddress(owner),
        time: date,
      });
    }
  }

  return domains;
};

const DomainCard = ({
  name,
  hash,
  fullhash,
  imageUrl,
  price,
  seller,
  time,
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
      <Text mt="2" color="gray.500">
        Зарегистрирован до: {time}
      </Text>
      <Button
        mt={4}
        colorScheme="red"
        onClick={() =>
          onBuy({ name, hash, fullhash, imageUrl, price, seller, time })
        }
      >
        Купить это имя
      </Button>
    </Box>
  </Box>
);

const Domain = () => {
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await fetchDomainEvents();
      setDomains(events);
    };

    fetchEvents();
  }, []);

  const handleBuyDomain = async (domain: Domain) => {
    console.log("Покупка домена:", domain);
    const contract = await connectZKKYC();
    await contract.buyName(domain.fullhash, {
      value: ethers.parseEther(domain.price),
    });
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
