import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Button, HStack } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { TestCasePanel } from './TestCasePanel';
import { TextEditor } from './TextEditor';
import { StreamingResponse } from './StreamingResponse';
import { useStreamingExecution } from '../hooks/useStreamingExecution';
import { useEditor } from '../hooks/useEditor';
import { useTheme } from '../hooks/useTheme';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [selectedExperimentId, setSelectedExperimentId] = useState<
    string | null
  >(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const { tokens } = useTheme();

  const { streamingState, startStreaming, stopStreaming } =
    useStreamingExecution();
  const { editorState, openEditor, closeEditor, saveEditor } = useEditor();

  const handleEditProperty = (
    property: string,
    value: string,
    title: string
  ) => {
    stopStreaming();
    openEditor(property, value, title);
  };

  const handleRunTestCase = (testCaseId: string, testCaseName: string) => {
    closeEditor();
    startStreaming(testCaseId, testCaseName);
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={tokens.colors.background.secondary}
    >
      {/* Top Navigation */}
      <Box
        bg={tokens.colors.background.primary}
        borderBottom="1px"
        borderColor={tokens.colors.border.primary}
        px={6}
        py={4}
      >
        <Flex align="center" justify="space-between">
          <HStack spacing={8}>
            <Heading size="lg" color={tokens.colors.text.primary}>
              kiwi
            </Heading>
            <HStack spacing={6}>
              <Button
                as={Link}
                to="/"
                variant={location.pathname === '/' ? 'solid' : 'ghost'}
                size="sm"
                colorScheme="blue"
              >
                Experiments
              </Button>
              <Button
                as={Link}
                to="/orchestrators"
                variant={
                  location.pathname === '/orchestrators' ? 'solid' : 'ghost'
                }
                size="sm"
                colorScheme="blue"
              >
                Orchestrators
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Flex flex={1}>
        {/* Left Sidebar */}
        <Sidebar
          onExperimentSelect={(id) => {
            setSelectedExperimentId(id);
            setRightPanelOpen(true);
          }}
          selectedExperimentId={selectedExperimentId}
        />

        {/* Main Content Area */}
        <Box flex={1} overflow="hidden">
          {editorState.isOpen ? (
            <TextEditor
              title={editorState.title}
              value={editorState.value}
              onSave={saveEditor}
              onCancel={closeEditor}
            />
          ) : streamingState.isStreaming ? (
            <StreamingResponse
              testCaseId={streamingState.testCaseId}
              testCaseName={streamingState.testCaseName}
              response={streamingState.response}
              logs={streamingState.logs}
              progress={streamingState.progress}
              isStreaming={streamingState.isStreaming}
              onComplete={stopStreaming}
              onCancel={stopStreaming}
            />
          ) : (
            children
          )}
        </Box>

        {/* Right Panel - Test Cases */}
        {rightPanelOpen && selectedExperimentId && (
          <TestCasePanel
            experimentId={selectedExperimentId}
            onClose={() => setRightPanelOpen(false)}
            onEditProperty={handleEditProperty}
            onRunTestCase={handleRunTestCase}
          />
        )}
      </Flex>
    </Flex>
  );
};
