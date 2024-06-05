import  { useState } from 'react';
import { styled, alpha, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 350,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchBar() {
  const [searchCriteria, setSearchCriteria] = useState('title');

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Select
        value={searchCriteria}
        onChange={handleSearchCriteriaChange}
        inputProps={{ 'aria-label': 'search criteria' }}
        style={ { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', outline: 'none'} }
        sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none !important' } }}
      >
        <MenuItem style={{border: 'none'}} value="title">Title</MenuItem>
        <MenuItem style={{border: 'none'}}  value="date">Date</MenuItem>
      </Select>
    </Search>
  );
}

export default SearchBar;
