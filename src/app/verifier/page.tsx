import React from "react";
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
} from "@chakra-ui/react";
import Commitment from "./functions/commitment";
import AgeProof from "./functions/ageProof";
import PassProof from "./functions/passProof";

const Proof = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Верификация
        </Heading>
        <Text color={"gray.500"}>Тут вы можете проверить доказательства</Text>
      </Box>

      <Tabs className="my-10">
        <TabList>
          <Tab>Мне больше 18 лет</Tab>
          <Tab>Я прошел KYC</Tab>
          <Tab>Доказательство данных паспорта</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AgeProof />
          </TabPanel>
          <TabPanel>
            <Commitment />
          </TabPanel>
          <TabPanel>
            <PassProof />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Proof;
