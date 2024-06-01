"use client";
import Image from "next/image";
import Head from "next/head";
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 4 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2x1", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Добро пожаловать в <br />
            <Text as={"span"} color={"red.400"}>
              zkKYC
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Проект zkKYC предлагает инновационный подход к децентрализованной
            идентификации, делая этот процесс простым и понятным для
            пользователей. <br />
            <br />
            После регистрации и прохождения верификации, вы получаете доступ к
            своему цифровому паспорту. Это позволяет вам самостоятельно выбирать
            и раскрывать только те атрибуты своих данных, которые необходимы в
            конкретной ситуации. Вы можете доказать свою личность и подтвердить,
            что вы реальный человек, без необходимости делиться всей информацией
            сразу. <br />
            <br />
            Кроме того, zkKYC предоставляет возможность создания персонального
            доменного имени. Это упрощает перевод средств: теперь ваши друзья и
            коллеги смогут отправлять вам деньги, просто используя ваше доменное
            имя, без необходимости ввода длинных и сложных строк символов. Весь
            процесс становится максимально удобным и безопасным. <br />
            <br />С zkKYC децентрализованная идентификация становится легкой и
            доступной каждому.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"red.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "red.500",
              }}
              onClick={() => router.push("/admin")}
            >
              Начать
            </Button>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
