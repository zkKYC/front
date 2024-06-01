import { Container, Input, Button } from "@chakra-ui/react";
import React from "react";

const Mint = () => {
  return (
    <Container>
      <Input placeholder="To" className="my-3" />
      <Input placeholder="Id" className="my-3" />
      <Input placeholder="Amount" className="my-3" />
      <Button colorScheme="red" className="my-3">
        Oтправить
      </Button>
    </Container>
  );
};

export default Mint;
