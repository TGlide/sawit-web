import { Button, Flex, Link, Text, Box } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import theme from "../theme";
import Wrapper from "./Wrapper";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link ml="auto">Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link ml={4}>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex alignItems="center" ml="auto">
        <Text>User: {data.me.username}</Text>
        <Button
          ml={4}
          variant="link"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Box
      bg={theme.colors.teal[600]}
      px={4}
      py={4}
      position="sticky"
      top={0}
      zIndex={2}
    >
      <Wrapper display="flex" alignItems="center" my={0}>
        <NextLink href="/">
          <Link fontSize={21} fontWeight="bold" mt={0}>
            🕶️ Sawit
          </Link>
        </NextLink>

        {body}
      </Wrapper>
    </Box>
  );
};

export default Navbar;
