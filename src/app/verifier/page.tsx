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
          <TabPanel>куку</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Proof;
