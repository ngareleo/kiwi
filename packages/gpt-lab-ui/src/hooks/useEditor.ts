import { useState } from 'react';

interface EditorState {
  isOpen: boolean;
  property: string;
  value: string;
  title: string;
}

export const useEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    isOpen: false,
    property: '',
    value: '',
    title: '',
  });

  const openEditor = (property: string, value: string, title: string) => {
    setEditorState({
      isOpen: true,
      property,
      value,
      title,
    });
  };

  const closeEditor = () => {
    setEditorState({
      isOpen: false,
      property: '',
      value: '',
      title: '',
    });
  };

  const saveEditor = (newValue: string) => {
    console.log(`Saving ${editorState.property}:`, newValue);
    closeEditor();
  };

  return {
    editorState,
    openEditor,
    closeEditor,
    saveEditor,
  };
};
