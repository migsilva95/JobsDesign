import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, Button, Checkbox, Chip, FormControl, Grid, IconButton, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import d from './data.json';
import { Opportunities } from './features/opportunities/opportunities';
import ClearIcon from "@mui/icons-material/Clear";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function App() {
  
  type MyType = {
    id: number,
    company: string,
    logo: string,
    new: boolean,
    featured: boolean,
    position: string,
    role: string,
    level: string,
    postedAt: string,
    contract: string,
    location: string,
    languages: string[],
    tools: string[]
  }

  const [data, setData] = useState<MyType[]>([]);
  const [dataOrdered, setDataOrdered] = useState<MyType[]>([]);
  const [dataToShow, setDataToShow] = useState<MyType[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [ascending, setAscending] = useState(true);
  const [descending, setDescending] = useState(true);
  const [searhString, setSearhString] = useState<string[]>([]);

  useEffect(() => {
    setData(d);
    let obj = [...d].sort((a, b) => {
      let pA = a.postedAt.split('');
      let pB = b.postedAt.split('');
      if ((pB[1] === "d") || (pB[1] === pA[1]) || (pB[1] === "w" && pA[1] === "m")) {
        if (pA[0] >= pB[0]) {
          return 1;
        }
        else {
          return -1;
        }
      }
      else {
        return -1;
      }
    });
    let searchArray: string[] = [];
    obj.forEach(o => {
      if(!searchArray.includes(o.role)) {
        searchArray.push(o.role);
      }
      if(!searchArray.includes(o.level)) {
        searchArray.push(o.level);
      }
      o.languages.forEach(l => {
        if(!searchArray.includes(l)) {
          searchArray.push(l);
        }
      });
      o.tools.forEach(t => {
        if(!searchArray.includes(t)) {
          searchArray.push(t);
        }
      });
    })
    setSearhString(searchArray);
    setDataOrdered(obj);
    setDataToShow(obj);
  }, []);

  useEffect(() => {
    let obj: MyType[] = [];
    data.forEach(d => {
      search.forEach(s => {
        let pushed = false;
        if ((d.languages.includes(s) || d.tools.includes(s)) && !pushed) {
          pushed = true;
          obj.push(d);
        }
      })
    })
    if (obj.length === 0) {
      setDataToShow(dataOrdered);
    }
    else {
      setDataToShow(obj);
    }
  }, [data, search]);

  const orderByName = (asc: boolean) => {
    if (asc) {
      setAscending(false);
      setDescending(true);
      setDataToShow([...data].sort((a, b) => a.position >= b.position ? 1 : -1));
    }
    else {
      setAscending(true);
      setDescending(false);
      setDataToShow([...data].sort((a, b) => a.position <= b.position ? 1 : -1));
    }
  };

  const resetOrder = () => {
    setAscending(true);
    setDescending(true);
    setDataToShow(dataOrdered);
  };

  const handleChange = (event: SelectChangeEvent<typeof search>) => {
    const {
      target: { value },
    } = event;
    setSearch(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{backgroundColor: 'darksalmon'}}>
      <div className="App">
        <header className="App-header">
          <FormControl sx={{ m: 1}}>
            <Select
              multiple
              value={search}
              onChange={handleChange}
              sx={{backgroundColor: 'white'}}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              endAdornment={<IconButton sx={{visibility: search.length > 0 ? "visible" : "hidden"}} onClick={() => setSearch([])}><ClearIcon/></IconButton>}
            >
              {searhString.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  <Checkbox checked={search.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <Grid spacing={2}
              sx={{
                justifyContent: 'center'
                }}>
              {ascending ? <Button variant="outlined" size="small" sx={{backgroundColor: 'white'}} onClick={() => orderByName(true)}>Ascending</Button> : <Button variant="contained" size="small" onClick={() =>  resetOrder()}>Ascending</Button>}
              {descending ? <Button variant="outlined" size="small" sx={{backgroundColor: 'white'}} onClick={() => orderByName(false)}>Descending</Button> : <Button variant="contained" size="small" onClick={() =>  resetOrder()}>Descending</Button>}
            </Grid>
          </FormControl>
        </header>
        <body className="App-body">
            <Grid >
              {dataToShow.map((element) => {
                return (
                  <>
                    <Opportunities element={element} />
                    <br />
                  </>
                );
              })}
            </Grid>
        </body>
      </div>
    </div>
  );
}

export default App;
