import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Grid, Card, Typography, CardMedia, CardHeader, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
  
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
  const dispatch = useAppDispatch();
  
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={"../." + props.element.logo}
          />
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body2" color="grey">
                {props.element.company}
              </Typography>
            </Grid>
            {props.element.new &&
              <Grid item>
                <Typography variant="body2" color="green">
                  &nbsp;NEW!
                </Typography>
              </Grid>
            }
            {props.element.featured &&
              <Grid item>
                <Typography variant="body2" color="black">
                  &nbsp;FEATURED
                </Typography>
              </Grid>
            }
          </Grid>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h5" color="inherit">
                {props.element.position}
              </Typography>
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
