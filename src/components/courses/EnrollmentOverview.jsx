import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { processCourseData } from '../../utils/courseUtils';

const EnrollmentOverview = ({ allCourses }) => {
  if (!allCourses) return null;


  const filteredCourses = processCourseData(allCourses.courses);

  // Bar options
  // Always keep this order: actual, lab-only, available, excess
  const BAR_OPTIONS = [
    { key: 'totalActualEnrollment', label: 'Actual Enrollment', color: '#3498db' },
    { key: 'labOnlyEnrollment', label: 'Lab-Only Enrollment', color: '#FFBB28' },
    { key: 'availableSeats', label: 'Available Seats', color: '#95a5a6' },
    { key: 'excessEnrollment', label: 'Excess Enrollment', color: '#e74c3c' },
  ];

  const [selectedBars, setSelectedBars] = useState(['totalActualEnrollment', 'labOnlyEnrollment', 'availableSeats', 'excessEnrollment']);


  // Always show bars in BAR_OPTIONS order, omitting unchecked
  const barsToShow = (selectedBars.length > 0 ? selectedBars : ['totalActualEnrollment'])
    .slice()
    .sort((a, b) => BAR_OPTIONS.findIndex(opt => opt.key === a) - BAR_OPTIONS.findIndex(opt => opt.key === b));

  const handleCheckboxChange = (key) => {
    setSelectedBars(prev => {
      if (prev.includes(key)) {
        // Remove
        return prev.filter(k => k !== key);
      } else {
        // Add
        return [...prev, key];
      }
    });
  };

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2>All CMPS Courses - Enrollment Overview</h2>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontWeight: 500, marginRight: 8 }}>Show:</span>
          {BAR_OPTIONS.map(opt => (
            <label key={opt.key} style={{ marginRight: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={selectedBars.includes(opt.key)}
                onChange={() => handleCheckboxChange(opt.key)}
              />
              <span style={{ color: opt.color }}>{opt.label}</span>
            </label>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredCourses}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="courseKey" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {BAR_OPTIONS.map(opt => (
              barsToShow.includes(opt.key) ? (
                <Bar
                  key={opt.key}
                  dataKey={opt.key}
                  fill={opt.color}
                  name={opt.label}
                  stackId="enroll"
                />
              ) : null
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Summary</h3>
          <p style={{ margin: '5px 0' }}>Total Courses: {filteredCourses.length}</p>
          <p style={{ margin: '5px 0' }}>
            Total Enrollment: {filteredCourses.reduce((sum, c) => sum + c.totalActualEnrollment, 0)}
          </p>
          <p style={{ margin: '5px 0' }}>
            Total Capacity: {filteredCourses.reduce((sum, c) => sum + c.totalMaxEnrollment, 0)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentOverview;
