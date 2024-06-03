"use client";

import React from "react";
import { Container, Box, Heading, Text, Button } from "@chakra-ui/react";

import { createCommit } from "./createCommit";

const Commit = () => {
  const handleCommit = async () => {
    await createCommit();
  };

  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Создать обязательство
        </Heading>
        <Text color={"gray.500"}>
          После регистрации вас в системе у вас появится возможность сделать
          обязательство для фиксации того, что вы прошли процедуру верификации
          личности
        </Text>
        <Button colorScheme="red" className="my-3" onClick={handleCommit}>
          Создать обязательство
        </Button>
      </Box>
    </Container>
  );
};

export default Commit;
