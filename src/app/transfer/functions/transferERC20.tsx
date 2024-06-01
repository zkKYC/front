import { Container, Input, Button } from "@chakra-ui/react";
import React from "react";

const TransferERC20 = () => {
  return (
    <Container>
      <Input placeholder="Имя" className="my-3" />
      <Input placeholder="Сумма перевода" type="number" className="my-3" />
      <Input placeholder="Адрес токена" type="number" className="my-3" />
      <Button colorScheme="red" className="my-3">
        Создать имя
      </Button>
    </Container>
  );
};

export default TransferERC20;