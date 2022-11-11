import React, { useState, useEffect } from 'react';
import './App.css';
import { Grid, Input } from '@mui/material';
import d from './data.json';
import { Opportunities } from './features/opportunities/opportunities';

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
  const [dataToShow, setDataToShow] = useState<MyType[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(d);
    setDataToShow(d);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}  />
          <br />
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {dataToShow.map((element) => {
              return (
                <>
                  <Opportunities element={element} />
                  <br />
                </>
              );
            })}
          </Grid>
      </header>
    </div>
  );
}

export default App;
