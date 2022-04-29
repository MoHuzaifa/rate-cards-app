import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import styles from './CustomTable.module.scss';

const CustomTable = ({ headerRow, data }) => (
  <TableContainer>
    <Table stickyHeader aria-label='sticky table'>
      <TableHead>
        <TableRow>
          {headerRow?.map((heading) => (
            <TableCell
              className={styles.tabel__cell}
              key={heading.key}
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
                row[header.key] || row[header.key] === false
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

export default CustomTable;
