import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

/**
 * Generic SearchFilter Component
 * 
 * Filters data based on search query and specified fields.
 * 
 * @param {Array} data - The data to filter.
 * @param {Array} searchFields - Fields to search within the data.
 * @param {Function} onFilter - Callback to return filtered data.
 */
const SearchFilter = ({ data, searchFields, onFilter }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim() === '') {
      onFilter(data);
    } else {
      const filtered = data.filter((item) =>
        searchFields.some((field) => {
          const keys = field.split('.');
          let value = item;
          for (const key of keys) {
            value = value?.[key];
          }
          return value?.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
      onFilter(filtered);
    }
  }, [query, data, searchFields, onFilter]);

  return (
    <Box marginBottom={4} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px', borderRadius: '12px' }}> 
      {/* Enhanced design with shadow and padding */}
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          style: {
            borderRadius: '12px', // Add border radius here
          },
        }}
      />
    </Box>
  );
};

export default SearchFilter;
