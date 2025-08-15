import React, { useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

interface FormData {
  name: string;
  description: string;
  input: Record<string, unknown>;
  expectedOutput: Record<string, unknown>;
}

interface TestCaseFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export const TestCaseForm: React.FC<TestCaseFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    input: {},
    expectedOutput: {},
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter test case name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter test case description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Input</FormLabel>
          <Textarea
            placeholder="Enter input JSON"
            value={JSON.stringify(formData.input, null, 2)}
            onChange={(e) => {
              try {
                const input = JSON.parse(e.target.value);
                setFormData({ ...formData, input });
              } catch {
                // Invalid JSON, ignore
              }
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Expected Output</FormLabel>
          <Textarea
            placeholder="Enter expected output JSON"
            value={JSON.stringify(formData.expectedOutput, null, 2)}
            onChange={(e) => {
              try {
                const expectedOutput = JSON.parse(e.target.value);
                setFormData({ ...formData, expectedOutput });
              } catch {
                // Invalid JSON, ignore
              }
            }}
          />
        </FormControl>

        <Button colorScheme="brand" onClick={handleSubmit}>
          Create Test Case
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};
