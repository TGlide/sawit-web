import { Button, Flex, Text, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import theme from "../theme";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Wrapper variant="small" mt={8}>
      {complete ? (
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="3xl" fontWeight="semibold">
            😄 E-mail sent!
          </Text>
          <Text mt={4} textAlign="center">
            If an user with the provided e-mail exists, you'll receive an e-mail
            with the provided instructions to change your password.
          </Text>

          <NextLink href="/">
            <Button mt={4} color={theme.colors.teal[500]}>
              Back to initial page
            </Button>
          </NextLink>
        </Flex>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" label="E-mail" placeholder="E-mail" />

              <Button
                type="submit"
                variantColor="teal"
                mt={4}
                isLoading={isSubmitting}
              >
                Send verification email
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
