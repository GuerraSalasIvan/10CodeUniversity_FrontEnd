import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNote from '@mui/icons-material/EventNote';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Build from '@mui/icons-material/Build';
import Link from 'next/link';

export const mainListItems = (
  <React.Fragment>

    <Link href={'/dashboard'}>
      <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
      </ListItemButton>
    </Link>

    <Link href={'/dashboard/teams'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Equipos" />
      </ListItemButton>
    </Link>

    <Link href={'/dashboard/events'}>
      <ListItemButton>
        <ListItemIcon>
          <EventNote />
        </ListItemIcon>
        <ListItemText primary="Eventos" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <Build />
      </ListItemIcon>
      <ListItemText primary="Configuration" />
    </ListItemButton>
  </React.Fragment>
);
