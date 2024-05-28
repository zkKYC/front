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
          Тут вы можете управлять доменным именем своего адреса.
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
          <TabPanel>
            {" "}
            <Input placeholder="Имя" className="my-3" />
            <Input
              placeholder="Период в годах"
              type="number"
              className="my-3"
            />
            <Button colorScheme="red" className="my-3">
              Создать имя
            </Button>
          </TabPanel>

          <TabPanel>
            {" "}
            <Input placeholder="Имя" className="my-3" />
            <Input
              placeholder="Период в годах"
              type="number"
              className="my-3"
            />
            <Button colorScheme="red" className="my-3">
              Продлить имя
            </Button>
          </TabPanel>
          <TabPanel>
            {" "}
            <Input placeholder="Имя" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Удалить имя
            </Button>
          </TabPanel>
          <TabPanel>
            {" "}
            <Input placeholder="Цена" type="number" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Продать имя
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Domain;
