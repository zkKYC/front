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
  Input,
  Button,
} from "@chakra-ui/react";

const Proof = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Доказательства
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed risus
          ipsum. Proin eget auctor lacus. Integer eu ultrices lectus. Integer
          viverra pretium eros ut aliquet.
        </Text>
      </Box>

      <Tabs className="my-10">
        <TabList>
          <Tab>Возраст</Tab>
          <Tab>Прохождения KYC</Tab>
          <Tab>Страна</Tab>
          <Tab>Хеш документа</Tab>
          <Tab>Регион</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Input placeholder="Секрет" className="my-3" />
            <Input placeholder="Дата рождения" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
          <TabPanel>
            <Input placeholder="Хеш" className="my-3" />
            <Input placeholder="Дерево меркла" className="my-3" />
            <Input placeholder="Amount" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Proof;
