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
    <TableContainer sx={{ maxWidth: '900px' }}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {headerRow?.map((heading, index) => (
              <TableCell
                key={index}
                style={{ minWidth: '200px', fontWeight: 'bold' }}
                align='right'
              >
                {heading}
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
              {headerRow.map((header, index) => {
                const value =
                  row.hasOwnProperty(header) && row[header] !== null
                    ? row[header]?.toString()
                    : '-';
                return (
                  <TableCell key={index} align='right'>
                    {value === null ? 'NA' : value}
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
