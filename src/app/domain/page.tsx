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
          Домены
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed risus
          ipsum. Proin eget auctor lacus. Integer eu ultrices lectus. Integer
          viverra pretium eros ut aliquet.
        </Text>
      </Box>

      <Tabs className="my-10">
        <TabList>
          <Tab>Регистрация имени</Tab>
          <Tab>Продление имени</Tab>
          <Tab>Удаление имени</Tab>
          <Tab>Продажа имени</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>Регистрация</TabPanel>
          <TabPanel>Продление</TabPanel>
          <TabPanel>Удаление</TabPanel>
          <TabPanel>Продажа</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Domain;
