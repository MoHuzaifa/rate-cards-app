import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectMenu = ({menuItems, cardType, handleChange}) => {
	return (
		<FormControl
			sx={{
				minWidth: '12rem',
			}}
		>
			<InputLabel id='rate-card-type-label'>Rate Cards Type</InputLabel>
			<Select
				labelId='rate-card-type-label'
				value={cardType}
				label='Rate Cards Type'
				onChange={handleChange}
			>
				{menuItems?.map((item, index) => (
					<MenuItem key={index} value={item}>{item}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectMenu;
