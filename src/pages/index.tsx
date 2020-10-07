import {
  Box,
  Button,
  Stack,
  Text,
  theme,
  Spinner,
  Skeleton,
  Flex,
  Divider,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: variables,
  });

  return (
    <>
      <Navbar />
      <Wrapper>
        <NextLink href="/create-post">
          <Button mt={6} w="full" color={theme.colors.teal[500]}>
            ✏ Create Post
          </Button>
        </NextLink>

        <Stack spacing={2} mt={4}>
          {!data && fetching && (
            <Stack spacing={2}>
              {[...Array(10)].map((_) => (
                <Box opacity={0.5}>
                  <Skeleton w="full" h={20} />
                </Box>
              ))}
            </Stack>
          )}

          {!data && !fetching && (
            <Box mt={6}>
              <Text textAlign={"center"} fontSize="3xl">
                😢 Oh no!
              </Text>
              <Text textAlign={"center"} fontSize="lg" mt={2}>
                The posts didn't load for you... Please try refreshing the page
              </Text>
            </Box>
          )}

          {data &&
            data.posts.posts.map((p) => (
              <Box
                key={p.id}
                bg={theme.colors.gray[700]}
                px={4}
                py={4}
                rounded="md"
              >
                <Text fontSize="xl" fontWeight={600}>
                  {p.title} by {p.creator.username}
                </Text>
                <Text mt={2}>
                  {p.text.length > 50 ? p.text.slice(0, 50) + "..." : p.text}
                </Text>
              </Box>
            ))}
        </Stack>

        {data && data.posts.hasMore && (
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            mt={6}
            w="full"
          >
            🔃 Load more
          </Button>
        )}

        {data && !data.posts.hasMore && (
          <Flex alignItems="center" mt={6}>
            <Divider flex={1} />
            <Text mx={6} color={theme.colors.gray[400]}>
              End of posts
            </Text>
            <Divider flex={1} />
          </Flex>
        )}
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
