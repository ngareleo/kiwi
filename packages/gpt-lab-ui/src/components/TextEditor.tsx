import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Button,
  Textarea,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

interface TextEditorProps {
  title: string;
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  title,
  value,
  onSave,
  onCancel,
}) => {
  const [editValue, setEditValue] = useState(value);

  const bg = useColorModeValue('white', 'gray.800');

  const handleSave = () => {
    onSave(editValue);
  };

  return (
    <Box p={6} bg={bg} h="full" overflow="auto">
      <VStack spacing={4} align="stretch" h="full">
        <Heading size="md">{title}</Heading>

        <Textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()}...`}
          resize="vertical"
          minH="300px"
          flex={1}
        />

        <HStack spacing={3}>
          <Button colorScheme="brand" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
