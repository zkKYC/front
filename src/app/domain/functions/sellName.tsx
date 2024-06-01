import { Container, Input, Button } from "@chakra-ui/react";
import React from "react";

const SellName = () => {
  return (
    <Container>
      <Input placeholder="Цена" type="number" className="my-3" />
      <Button colorScheme="red" className="my-3">
        Продать имя
      </Button>
    </Container>
  );
};

export default SellName;
