import { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import SelectMenu from '../components/SelectMenu';
import CustomTable from '../components/CustomTable';
import loadCardsData from './api/data';
import { FDDHeaderRow, LumpSumHeaderRow, menuItems } from '../helper';
import Head from 'next/head';

export default function Home() {
  const [cardType, setCardType] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    loadCardsData(cardType).then(setData);
  }, [cardType]);

  const handleChange = (event) => {
    setCardType(event.target.value);
  };

  const handleClick = () => {
    alert('Begin Download');
  };

  return (
    <Stack alignItems='center' gap={5}>
      {/* Head Tag */}
      <Head>
        <title>RateCards</title>
      </Head>

      {/* Main Title */}
      <h1>Rate Cards</h1>

      {/* Drop Down Menu */}
      <SelectMenu
        menuItems={menuItems}
        cardType={cardType}
        handleChange={handleChange}
      />

      {/* Custom Table */}
      {cardType !== '' && (
        <CustomTable
          headerRow={cardType === 'FDD' ? FDDHeaderRow : LumpSumHeaderRow}
          data={data}
        />
      )}

      <Button variant='contained' onClick={handleClick}>
        Download
      </Button>
    </Stack>
  );
}
