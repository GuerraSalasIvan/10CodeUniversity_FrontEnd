'use client'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from '@/app/ui/templates/dashboard/Orders';

export default function Page() {
    return (
      <Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    );
  }