import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

export { useFormField } from '@/hooks/useFormField';

export const Form = ({ children }: { children: React.ReactNode }) => children;

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />;
};

export const FormItem = ChakraFormControl;
export const FormLabel = ChakraFormLabel;
export const FormControl = ({ children }: { children: React.ReactNode }) =>
  children;
export const FormDescription = FormHelperText;
export const FormMessage = FormErrorMessage;
