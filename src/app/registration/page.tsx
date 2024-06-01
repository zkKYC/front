"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ethers } from "ethers";
import Select from "react-select";
import { fetchAndParseXML } from "../../utils/countries";
import {
  registrationHandle,
  FormData,
  FormDataErrors,
} from "./registrationHandle";

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    evmAddress: "",
    lastName: "",
    firstName: "",
    middleName: "",
    country: "",
    snils: "",
    passport: "",
    birthDate: null,
    gender: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataErrors>>({});
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countryIsoMapping = await fetchAndParseXML();
      const options = Object.keys(countryIsoMapping).map((name) => ({
        label: name,
        value: countryIsoMapping[name],
      }));
      setCountryOptions(options);
    };

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      country: selectedOption ? selectedOption.value : "",
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      birthDate: date,
    });
  };

  const validateForm = () => {
    let formErrors: Partial<FormDataErrors> = {};
    if (!formData.evmAddress || !ethers.isAddress(formData.evmAddress)) {
      formErrors.evmAddress = "Введите действительный EVM-адрес";
    }
    if (!formData.lastName || /\d/.test(formData.lastName)) {
      formErrors.lastName = "Фамилия не должна содержать цифр";
    }
    if (!formData.firstName || /\d/.test(formData.firstName)) {
      formErrors.firstName = "Имя не должно содержать цифр";
    }
    if (!formData.middleName || /\d/.test(formData.middleName)) {
      formErrors.middleName = "Отчество не должно содержать цифр";
    }
    if (!formData.country) {
      formErrors.country = "Поле обязательно для заполнения";
    }
    if (!formData.snils || /[A-Za-z]/.test(formData.snils)) {
      formErrors.snils = "СНИЛС не должен содержать букв";
    }
    if (!formData.passport || /[A-Za-z]/.test(formData.passport)) {
      formErrors.passport = "Серия и номер паспорта не должны содержать букв";
    }
    if (!formData.birthDate) {
      formErrors.birthDate = "Поле обязательно для заполнения";
    }
    if (!formData.gender) {
      formErrors.gender = "Поле обязательно для заполнения";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const dataToSend = {
        ...formData,
        birthDate: formData.birthDate
          ? Math.floor(formData.birthDate.getTime() / 1000)
          : null,
      };
      // to contract
      registrationHandle(dataToSend);

      console.log(dataToSend);
    }
  };

  // Extract data for button click handling
  const {
    evmAddress,
    lastName,
    firstName,
    middleName,
    country,
    snils,
    passport,
    birthDate,
    gender,
  } = formData;

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

      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.evmAddress}>
          <Input
            placeholder="evm-адрес пользователя"
            name="evmAddress"
            value={evmAddress}
            onChange={handleChange}
          />
          {errors.evmAddress && (
            <Text color="red.500">{errors.evmAddress}</Text>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.lastName}>
          <Input
            placeholder="Фамилия"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.firstName}>
          <Input
            placeholder="Имя"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.middleName}>
          <Input
            placeholder="Отчество"
            name="middleName"
            value={middleName}
            onChange={handleChange}
          />
          {errors.middleName && (
            <Text color="red.500">{errors.middleName}</Text>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.country}>
          <Select
            options={countryOptions}
            placeholder="Страна"
            value={countryOptions.find((option) => option.value === country)}
            onChange={handleSelectChange}
          />
          {errors.country && <Text color="red.500">{errors.country}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.snils}>
          <Input
            placeholder="СНИЛС"
            type="number"
            name="snils"
            value={snils}
            onChange={handleChange}
          />
          {errors.snils && <Text color="red.500">{errors.snils}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.passport}>
          <Input
            placeholder="Серия и номер паспорта"
            name="passport"
            type="number"
            value={passport}
            onChange={handleChange}
          />
          {errors.passport && <Text color="red.500">{errors.passport}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.birthDate}>
          <DatePicker
            selected={birthDate}
            onChange={handleDateChange}
            placeholderText="Дата рождения"
          />
          {errors.birthDate && <Text color="red.500">{errors.birthDate}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.gender}>
          <Select
            options={[
              { label: "Муж", value: "0" },
              { label: "Жен", value: "1" },
            ]}
            placeholder="Пол"
            value={{
              label: gender === "0" ? "Муж" : gender === "1" ? "Жен" : "Пол",
              value: gender,
            }}
            onChange={(selectedOption) =>
              setFormData({
                ...formData,
                gender: selectedOption ? selectedOption.value : "",
              })
            }
          />
          {errors.gender && <Text color="red.500">{errors.gender}</Text>}
        </FormControl>

        <Button colorScheme="red" onClick={handleSubmit}>
          Отправить
        </Button>
      </VStack>
    </Container>
  );
};

export default Registration;
