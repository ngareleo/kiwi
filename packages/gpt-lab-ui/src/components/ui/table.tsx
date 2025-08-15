import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption as ChakraTableCaption,
  TableContainer,
} from '@chakra-ui/react';

export const Table = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <TableContainer>
      <ChakraTable {...props}>{children}</ChakraTable>
    </TableContainer>
  );
};

export const TableHeader = Thead;
export const TableBody = Tbody;
export const TableFooter = Tfoot;
export const TableRow = Tr;
export const TableHead = Th;
export const TableCell = Td;
export const TableCaption = ChakraTableCaption;
