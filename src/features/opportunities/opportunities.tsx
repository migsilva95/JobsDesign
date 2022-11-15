import React, { useState } from 'react';
import { Grid, Card, Typography, CardMedia, CardHeader, Box, Chip, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { color } from '@mui/system';
  
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

export function Opportunities(props: { element: MyType; }) {
  
  return (
    <>
      <Grid item>
        <Card>
          <CardMedia
            component="img"
            image={"../." + props.element.logo}
          />
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1" color="grey">
                {props.element.company}
              </Typography>
            </Grid>
            {props.element.new &&
              <>
                <Grid item>
                  <Typography variant="body1" color="grey">
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip key='NEW!' label='NEW!' style={{ backgroundColor: 'green', color: 'white' }}/>
                </Grid>
              </>
            }
            {props.element.featured &&
              <>
                <Grid item>
                  <Typography variant="body1" color="grey">
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip key='FEATURED' label='FEATURED' style={{ backgroundColor: 'black', color: 'white' }}/>
                </Grid>
              </>
            }
          </Grid>
          <Grid container>
            <Grid item style={{ flexGrow: "1" }}>
              <Typography variant="h4" color="inherit" >
                {props.element.position}
              </Typography>
            </Grid>
            <Grid xs={5} item>
              <Button variant="contained" size="small" sx={{backgroundColor: 'green'}}>
                {props.element.role}
              </Button>
              <Button variant="contained" size="small" sx={{backgroundColor: 'green'}}>
                {props.element.level}
              </Button>
              {props.element.languages.map(l => {
                return (
                  <Button variant="contained" size="small" sx={{backgroundColor: 'green'}}>
                  {l}
                  </Button>
                )
              })}
              {props.element.tools.map(t => {
                return (
                  <Button variant="contained" size="small" sx={{backgroundColor: 'green'}}>
                  {t}
                  </Button>
                )
              })}
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                {props.element.postedAt + ' \u2B24 ' + props.element.contract + ' \u2B24 ' + props.element.location}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
