import React, { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/core";

type WrapperProps = {
  children: ReactNode;
  variant?: "small" | "regular";
} & BoxProps;

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  ...props
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mx="auto"
      my={6}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
