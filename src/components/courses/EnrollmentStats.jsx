import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../utils/courseUtils';

const EnrollmentStats = ({ enrollmentStats }) => {

  const [selectedIndex, setSelectedIndex] = useState(null);
  if (!enrollmentStats) return null;

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2>Enrollment Statistics</h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#3498db' }}>
            {enrollmentStats.totalCourses}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Total Courses</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#27ae60' }}>
            {enrollmentStats.totalSections}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Total Sections</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#e67e22' }}>
            {enrollmentStats.totalEnrollment}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Total Enrollment</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#9b59b6' }}>
            {enrollmentStats.averageUtilization}%
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Avg Utilization</p>
        </div>
      </div>

      <div
        style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center'
        }}
        onClick={() => setSelectedIndex(null)}
      >
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={[
                { name: 'High Enrollment (>90%)', value: enrollmentStats.coursesWithHighEnrollment },
                { name: 'Medium Enrollment (50-90%)', value: enrollmentStats.coursesWithMediumEnrollment },
                { name: 'Low Enrollment (<50%)', value: enrollmentStats.coursesWithLowEnrollment }
              ]}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {[0, 1, 2].map((index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  stroke={selectedIndex === index ? '#e74c3c' : undefined}
                  strokeWidth={selectedIndex === index ? 5 : 1}
                  style={{ cursor: 'pointer', outline: 'none' }}
                  tabIndex={-1}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default EnrollmentStats;
