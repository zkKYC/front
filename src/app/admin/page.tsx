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
import Registration from "./registration/registration";
import SetURI from "./sbts/setURI";
import Mint from "./sbts/Mint";
import Burn from "./sbts/Burn";

const Admin = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Панель админитратора
        </Heading>
        <Text color={"gray.500"}>
          Эта страница отвечает за административную регистрацию пользователей и
          должна использоваться только банковскими органами. Они добавляют
          информацию о пользователе, которая в дальнейшем используется для
          подтверждения различных данных с помощью ZK-доказательств.
        </Text>
      </Box>

      <Tabs className="my-10">
        <TabList
          display="grid"
          gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          width="100%"
        >
          <Tab>Регистрация</Tab>
          <Tab>Установить URI</Tab>
          <Tab>Чеканка</Tab>
          <Tab>Сжигание</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Registration />
          </TabPanel>
          <TabPanel>
            <SetURI />
          </TabPanel>
          <TabPanel>
            <Mint />
          </TabPanel>
          <TabPanel>
            <Burn />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Admin;
