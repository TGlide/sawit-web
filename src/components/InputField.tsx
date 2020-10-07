import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let InputComponent = props?.type === "textarea" ? Textarea : Input;

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}

      <InputComponent
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
