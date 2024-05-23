import React from "react";
import { Box, Button, Container, Heading, Input, Text } from "@chakra-ui/react";

const Registration = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Registration
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Box>

      <Input placeholder="Basic usage" className="my-3" />
      <Input placeholder="Basic usage" className="my-3" />
      <Input placeholder="Basic usage" className="my-3" />
      <Input placeholder="Basic usage" className="my-3" />
      <Input placeholder="Basic usage" className="my-3" />

      <Button colorScheme="red" className="my-3">
        Submit
      </Button>
    </Container>
  );
};

export default Registration;
