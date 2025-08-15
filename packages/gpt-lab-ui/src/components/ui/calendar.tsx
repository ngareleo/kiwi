import React from 'react';
import { Box } from '@chakra-ui/react';

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  className,
  selected,
  onSelect,
}) => {
  return (
    <Box className={className} p={3}>
      <input
        type="date"
        value={selected ? selected.toISOString().split('T')[0] : ''}
        onChange={(e) =>
          onSelect?.(e.target.value ? new Date(e.target.value) : undefined)
        }
      />
    </Box>
  );
};
