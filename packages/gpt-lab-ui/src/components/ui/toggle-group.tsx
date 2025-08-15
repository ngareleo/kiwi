import { ButtonGroup, Button } from '@chakra-ui/react';

interface ToggleGroupProps {
  children: React.ReactNode;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ children }) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};

interface ToggleGroupItemProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  children,
  isSelected,
  onClick,
}) => {
  return (
    <Button variant={isSelected ? 'solid' : 'outline'} onClick={onClick}>
      {children}
    </Button>
  );
};
