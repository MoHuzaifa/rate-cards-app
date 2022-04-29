import { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import saveAs from 'file-saver';
import Head from 'next/head';

import { FDDHeaderRow, LumpSumHeaderRow, menuItems } from '../helper';
import SelectMenu from '../components/SelectMenu';
import CustomTable from '../components/customTable/CustomTable';
import loadCardsData from './api/data';
import styles from '../styles/Home.module.css';

const rateCardTypes = {
  FDD: 'FDD',
  LumpSum: 'Lumpsum',
};
const RATE_CARD_HASH = 'rateCardHash';
const DELETED = 'deleted';

export default function Home() {
  const [cardType, setCardType] = useState('');
  const [data, setData] = useState([]);
  const [headerRow, setHeaderRow] = useState([]);

  useEffect(() => {
    if (cardType) {
      (async () => {
        const tempData = await loadCardsData(cardType);
        setData(tempData);
      })();
      cardType === rateCardTypes.FDD
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
      if (current.key !== RATE_CARD_HASH && current.key !== DELETED) {
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
    const file = new File([csvData], `${cardType} ratecards.csv`);
    saveAs(file);
  };

  const handleClick = () => {
    const csvData = generateCSVObject();
    saveFile(csvData);
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
      {cardType && <CustomTable headerRow={headerRow} data={data} />}

      <Button variant='contained' onClick={handleClick} disabled={!cardType}>
        Download
      </Button>
    </Stack>
  );
}
