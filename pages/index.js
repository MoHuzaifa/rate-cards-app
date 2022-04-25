import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { CSVLink } from 'react-csv';
import SelectMenu from '../components/SelectMenu';
import CustomTable from '../components/CustomTable';
import loadCardsData from './api/data';
import { FDDHeaderRow, LumpSumHeaderRow, menuItems } from '../helper';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [cardType, setCardType] = useState('');
  const [data, setData] = useState([]);
  const [headerRow, setHeaderRow] = useState([]);

  useEffect(() => {
    loadCardsData(cardType).then(setData);
    cardType === 'FDD'
      ? setHeaderRow(FDDHeaderRow)
      : setHeaderRow(LumpSumHeaderRow);
  }, [cardType]);

  const handleChange = (event) => {
    setCardType(event.target.value);
  };

  const handleClick = () => (cardType === '' ? false : true);

  return (
    <Stack alignItems='center' gap={5} sx={{ paddingX: '5rem' }}>
      {/* Head Tag */}
      <Head>
        <title>RateCards</title>
      </Head>

      {/* Main Title */}
      <h1 className={styles.title}>Rate Cards</h1>

      {/* Drop Down Menu */}
      <SelectMenu
        menuItems={menuItems}
        cardType={cardType}
        handleChange={handleChange}
      />

      {/* Custom Table */}
      {cardType !== '' && <CustomTable headerRow={headerRow} data={data} />}

      <CSVLink
        filename={
          cardType === 'FDD' ? 'FDD ratecards.csv' : 'Lumpsum ratecards.csv'
        }
        headers={headerRow}
        data={data}
        onClick={handleClick}
        style={{
          background: cardType === '' ? '#E0E0E0' : '#1565C0',
          color: cardType === '' ? '#7E7E7E' : '#ffffff',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          borderRadius: '0.25rem',
          cursor: cardType === '' ? 'not-allowed' : 'pointer',
        }}
      >
        Download
      </CSVLink>
    </Stack>
  );
}
