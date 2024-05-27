import React from "react";
import { Box, Button, Container, Heading, Input, Text } from "@chakra-ui/react";

const Registration = () => {
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Регистрация
        </Heading>
        <Text color={"gray.500"}>
          Эта страница отвечает за административную регистрацию пользователей и
          должна использоваться только банковскими органами. Они добавляют
          информацию о пользователе, которая в дальнейшем используется для
          подтверждения различных данных с помощью ZK-доказательств.
        </Text>
      </Box>

      <Input placeholder="Адрес пользователя" className="my-3" />
      <Input placeholder="ФИО" className="my-3" />
      <Input placeholder="Страна" className="my-3" />
      <Input placeholder="Регион" className="my-3" />
      <Input placeholder="Серия и номер паспорта" className="my-3" />
      <Input placeholder="Дата рождения" className="my-3" />

      <Button colorScheme="red" className="my-3">
        Oтправить
      </Button>
    </Container>
  );
};

export default Registration;
