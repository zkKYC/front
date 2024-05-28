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

const MySbts = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Управление SBTs
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed risus
          ipsum. Proin eget auctor lacus. Integer eu ultrices lectus. Integer
          viverra pretium eros ut aliquet.
        </Text>
      </Box>

      <Tabs className="my-10">
        <TabList>
          <Tab>setURI</Tab>
          <Tab>mint</Tab>
          <Tab>burn</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Input placeholder="Id" className="my-3" />
            <Input placeholder="URI" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
          <TabPanel>
            <Input placeholder="To" className="my-3" />
            <Input placeholder="Id" className="my-3" />
            <Input placeholder="Amount" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
          <TabPanel>
            <Input placeholder="From" className="my-3" />
            <Input placeholder="Id" className="my-3" />
            <Input placeholder="Amount" className="my-3" />
            <Button colorScheme="red" className="my-3">
              Oтправить
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MySbts;
