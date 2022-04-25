import { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import saveAs from 'file-saver';
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
    if (cardType !== '') {
      loadCardsData(cardType).then(setData);
      cardType === 'FDD'
        ? setHeaderRow(FDDHeaderRow)
        : setHeaderRow(LumpSumHeaderRow);
    }
  }, [cardType]);

  const handleChange = (event) => {
    setCardType(event.target.value);
  };

  const generateCSVObject = () => {
    const csvArray = [];
    //Get an array of all attribute names (Column Headers) except rateCardHash & deleted//
    const headers = headerRow?.reduce((accumulator, current) => {
      if (current.key !== 'rateCardHash' && current.key !== 'deleted') {
        accumulator.push(current.key);
      }
      return accumulator;
    }, []);
    csvArray.push(headers.join(','));

    //Get an array of all the values corresponding to the above extracted headers//
    for (const row of data) {
      const values = headers.map((header) => row[header]);
      csvArray.push(values.join(','));
    }

    return csvArray.join('\n');
  };

  const saveFile = (csvData) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(
      blob,
      cardType === 'FDD' ? 'FDD ratecards.csv' : 'Lumpsum ratecards.csv'
    );
  };

  const handleClick = () => {
    if (cardType !== '') {
      const csvData = generateCSVObject();
      saveFile(csvData);
    }
  };

  return (
    <Stack alignItems='center' gap={5} sx={{ paddingX: '5rem' }}>
      {/* Head Tag */}
      <Head>
        <title>RateCards App</title>
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

      <Button
        variant='contained'
        onClick={handleClick}
        disabled={cardType === ''}
      >
        Download
      </Button>
    </Stack>
  );
}
