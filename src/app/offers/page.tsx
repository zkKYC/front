import {
  Box,
  Container,
  Heading,
  Text,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";

const Domain = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Предложения о покупке доменов
        </Heading>
        <Text color={"gray.500"}>Тут можно купить домен</Text>
      </Box>
    </Container>
  );
};

export default Domain;
