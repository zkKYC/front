"use client";

import { connectZKKYC } from "@/utils/provider";
import {
  Container,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, FormikErrors, Form, Field, ErrorMessage } from "formik";

interface FormValues {
  id: string;
  uri: string;
}

const SetURI = () => {
  return (
    <Formik
      initialValues={{ id: "", uri: "" }}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.id) {
          errors.id = "Required";
        }

        if (!values.uri) {
          errors.uri = "Required";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const contract = await connectZKKYC();

        contract.setURI(values.id, values.uri);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormControl>
            <FormLabel>Id</FormLabel>
            <Field as={Input} type="id" name="id" />
            <ErrorMessage name="id" component="div" />
          </FormControl>

          <FormControl className="mt-5">
            <FormLabel>Uri</FormLabel>
            <Field as={Input} type="uri" name="uri" />
            <ErrorMessage name="uri" component="div" />
          </FormControl>

          <Button
            className="mt-10"
            colorScheme="red"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SetURI;
