import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2
    }}
  >
    <Box
      sx={{
        backgroundColor: `${color}.lighter`,
        borderRadius: '50%',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography color="textSecondary" variant="subtitle2">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </Box>
  </Paper>
);

const StatsCards = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<InventoryIcon color="primary" />}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          icon={<WarningIcon color="error" />}
          color="error"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          icon={<MoneyIcon color="success" />}
          color="success"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Monthly Movements"
          value={stats.monthlyMovements}
          icon={<TrendingUpIcon color="info" />}
          color="info"
        />
      </Grid>
    </Grid>
  );
};

export default StatsCards;
