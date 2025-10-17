import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock data for 4 time steps (Q1, Q2, Q3, Q4)
const mockData = {
  Q1: {
    barData: [
      { name: 'Product A', sales: 4000, revenue: 2400 },
      { name: 'Product B', sales: 3000, revenue: 1398 },
      { name: 'Product C', sales: 2000, revenue: 9800 },
      { name: 'Product D', sales: 2780, revenue: 3908 },
      { name: 'Product E', sales: 1890, revenue: 4800 },
    ],
    pieData: [
      { name: 'Category A', value: 400 },
      { name: 'Category B', value: 300 },
      { name: 'Category C', value: 300 },
      { name: 'Category D', value: 200 },
    ],
  },
  Q2: {
    barData: [
      { name: 'Product A', sales: 4500, revenue: 2800 },
      { name: 'Product B', sales: 3200, revenue: 1600 },
      { name: 'Product C', sales: 2400, revenue: 10200 },
      { name: 'Product D', sales: 3100, revenue: 4200 },
      { name: 'Product E', sales: 2100, revenue: 5200 },
    ],
    pieData: [
      { name: 'Category A', value: 450 },
      { name: 'Category B', value: 320 },
      { name: 'Category C', value: 350 },
      { name: 'Category D', value: 280 },
    ],
  },
  Q3: {
    barData: [
      { name: 'Product A', sales: 5200, revenue: 3200 },
      { name: 'Product B', sales: 3800, revenue: 1900 },
      { name: 'Product C', sales: 2800, revenue: 11000 },
      { name: 'Product D', sales: 3500, revenue: 4800 },
      { name: 'Product E', sales: 2400, revenue: 5800 },
    ],
    pieData: [
      { name: 'Category A', value: 520 },
      { name: 'Category B', value: 380 },
      { name: 'Category C', value: 400 },
      { name: 'Category D', value: 300 },
    ],
  },
  Q4: {
    barData: [
      { name: 'Product A', sales: 5800, revenue: 3600 },
      { name: 'Product B', sales: 4200, revenue: 2200 },
      { name: 'Product C', sales: 3200, revenue: 12000 },
      { name: 'Product D', sales: 3900, revenue: 5400 },
      { name: 'Product E', sales: 2800, revenue: 6400 },
    ],
    pieData: [
      { name: 'Category A', value: 580 },
      { name: 'Category B', value: 420 },
      { name: 'Category C', value: 450 },
      { name: 'Category D', value: 350 },
    ],
  },
};

// API endpoint to get data for a specific time step
app.get('/api/data/:timeStep', (req, res) => {
  const { timeStep } = req.params;
  const data = mockData[timeStep];
  
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Time step not found' });
  }
});

// API endpoint to get all available time steps
app.get('/api/timesteps', (req, res) => {
  res.json(Object.keys(mockData));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
