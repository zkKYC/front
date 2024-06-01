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
import React from "react";
import TransferETH from "./functions/transferETH";
import TransferERC20 from "./functions/transferERC20";

const Domain = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Домены
        </Heading>
        <Text color={"gray.500"}>
          Тут вы можете управлять доменным именем своего адреса.
        </Text>
      </Box>

      <Tabs className="my-10">
        <TabList>
          <Tab flex="1">Перевод нативного токена </Tab>
          <Tab flex="1">Перевод ERC20 токена </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TransferETH />
          </TabPanel>

          <TabPanel>
            <TransferERC20 />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Domain;
