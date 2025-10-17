import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Media = () => {
  const [timeStep, setTimeStep] = useState('Q1');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeSteps = ['Q1', 'Q2', 'Q3', 'Q4'];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/data/${timeStep}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeStep]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Media Gallery - Data Visualization</h1>
      <p style={{ fontSize: '16px', marginBottom: '30px', color: '#666' }}>
        View dynamic data across different time periods with interactive charts.
      </p>

      {/* Time Step Selector */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Select Time Period</h2>
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          {timeSteps.map((step) => (
            <button
              key={step}
              onClick={() => setTimeStep(step)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: timeStep === step ? '#3498db' : '#ecf0f1',
                color: timeStep === step ? 'white' : '#2c3e50',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: timeStep === step ? '0 4px 6px rgba(52, 152, 219, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
              }}
              onMouseOver={(e) => {
                if (timeStep !== step) {
                  e.target.style.backgroundColor = '#bdc3c7';
                }
              }}
              onMouseOut={(e) => {
                if (timeStep !== step) {
                  e.target.style.backgroundColor = '#ecf0f1';
                }
              }}
            >
              {step}
            </button>
          ))}
        </div>
      </section>

      {/* Loading and Error States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#7f8c8d' }}>
          Loading data...
        </div>
      )}

      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          fontSize: '18px', 
          color: '#e74c3c',
          backgroundColor: '#fadbd8',
          borderRadius: '8px'
        }}>
          Error: {error}
        </div>
      )}

      {/* Charts Section */}
      {!loading && !error && chartData && (
        <>
          {/* Bar Chart */}
          <section style={{ marginBottom: '40px' }}>
            <h2>Sales and Revenue by Product - {timeStep}</h2>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData.barData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Pie Chart */}
          <section style={{ marginBottom: '40px' }}>
            <h2>Category Distribution - {timeStep}</h2>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Media;
