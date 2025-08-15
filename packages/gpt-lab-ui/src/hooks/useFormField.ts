import { useFormContext } from 'react-hook-form';
import { useId } from 'react';

export const useFormField = () => {
  const { formState } = useFormContext();
  const id = useId();

  return {
    formItemId: `form-item-${id}`,
    formDescriptionId: `form-description-${id}`,
    formMessageId: `form-message-${id}`,
    error: formState.errors,
  };
};
