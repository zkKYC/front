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

import RegisterName from "./functions/registerName";
import RenewName from "./functions/renewName";
import SellName from "./functions/sellName";
import RemoveName from "./functions/removeName";
import ShowName from "./functions/showName";

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
          <Tab flex="1">Регистрация </Tab>
          <Tab flex="1">Продление </Tab>
          <Tab flex="1">Удаление </Tab>
          <Tab flex="1">Продажа </Tab>
          <Tab flex="1">Ваша SBT</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RegisterName />
          </TabPanel>

          <TabPanel>
            <RenewName />
          </TabPanel>

          <TabPanel>
            <RemoveName />
          </TabPanel>

          <TabPanel>
            <SellName />
          </TabPanel>

          <TabPanel>
            <ShowName />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Domain;
