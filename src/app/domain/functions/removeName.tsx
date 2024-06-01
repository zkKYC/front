import { Container, Input, Button } from "@chakra-ui/react";
import React from "react";

const RemoveName = () => {
  return (
    <Container>
      <Input placeholder="Имя" className="my-3" />
      <Button colorScheme="red" className="my-3">
        Удалить имя
      </Button>
    </Container>
  );
};

export default RemoveName;
