import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Button,
} from "@chakra-ui/react";

const Commit = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Kомит
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed risus
          ipsum. Proin eget auctor lacus. Integer eu ultrices lectus. Integer
          viverra pretium eros ut aliquet.
        </Text>
      </Box>
    </Container>
  );
};

export default Commit;
