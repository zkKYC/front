import { Container, Input, Button } from "@chakra-ui/react";
import React from "react";

const SetURI = () => {
  return (
    <Container>
      <Input placeholder="Id" className="my-3" />
      <Input placeholder="URI" className="my-3" />
      <Button colorScheme="red" className="my-3">
        Oтправить
      </Button>
    </Container>
  );
};

export default SetURI;
