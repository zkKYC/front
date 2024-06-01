import {
  Container,
  Heading,
  Text,
  Input,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import React from "react";

const Verifier = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Верификация
        </Heading>
        <Text color={"gray.500"}>Тут можно проверить доказательства</Text>
      </Box>

      <Tabs className="my-10">
        <TabList>
          <Tab>setURI</Tab>
          <Tab>mint</Tab>
          <Tab>burn</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
          <TabPanel>
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
          <TabPanel>
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Verifier;
