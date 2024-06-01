import { Container, Input, Button } from "@chakra-ui/react";
import React from "react";

const RenewName = () => {
  return (
    <Container>
      <Input placeholder="Имя" className="my-3" />
      <Input placeholder="Период в годах" type="number" className="my-3" />
      <Button colorScheme="red" className="my-3">
        Продлить имя
      </Button>
    </Container>
  );
};

export default RenewName;
