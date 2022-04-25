import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const CustomTable = ({ headerRow, data }) => {
  return (
    <TableContainer>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {headerRow?.map((heading) => (
              <TableCell
                key={heading.key}
                style={{ minWidth: '150px', fontWeight: 'bold' }}
                align='right'
              >
                {heading.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {headerRow.map((header) => {
                const value =
                  row.hasOwnProperty(header.key) && row[header.key] !== null
                    ? row[header.key]?.toString()
                    : '-';
                return (
                  <TableCell key={header.key} align='right'>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
