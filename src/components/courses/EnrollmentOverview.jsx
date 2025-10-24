import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { processCourseData } from '../../utils/courseUtils';

const EnrollmentOverview = ({ allCourses, selectedCourse }) => {
  // Bar options
  // Always keep this order: actual, lab-only, available, excess
  const BAR_OPTIONS = [
    { key: 'totalActualEnrollment', label: 'Actual Enrollment', color: '#3498db' },
    { key: 'labOnlyEnrollment', label: 'Lab-Only Enrollment', color: '#b6eec7' }, // pale green
    { key: 'availableSeats', label: 'Available Seats', color: '#95a5a6' },
    { key: 'excessEnrollment', label: 'Excess Enrollment', color: '#e74c3c' },
  ];

  const [selectedBars, setSelectedBars] = useState(['totalActualEnrollment', 'labOnlyEnrollment', 'availableSeats', 'excessEnrollment']);

  if (!allCourses) return null;

  const filteredCourses = processCourseData(allCourses.courses);


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
              <span
                style={{
                  color:
                    opt.key === 'labOnlyEnrollment'
                      ? '#217a3c' // dark green for contrast
                      : opt.color
                }}
              >
                {opt.label}
              </span>
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
            <Legend
              formatter={(value, entry) => {
                if (value === 'Lab-Only Enrollment') {
                  return <span style={{ color: '#217a3c', fontWeight: 500 }}>{value}</span>;
                }
                return <span style={{ color: entry.color }}>{value}</span>;
              }}
            />
            {BAR_OPTIONS.map(opt => (
              <Bar
                key={opt.key}
                dataKey={opt.key}
                fill={opt.color}
                name={opt.label}
                stackId="enroll"
                hide={!barsToShow.includes(opt.key)}
                // Highlight the selected course's bar with a gold rectangle (only for the first bar type)
                shape={barProps => {
                  const isSelected = selectedCourse && barProps.payload && (barProps.payload.courseNumber === selectedCourse || barProps.payload.courseKey === selectedCourse);
                  // Fix: Use y-axis scale to get the correct y and height for the gold rectangle
                  // barProps.yAxis is available in recharts >=2.1.0, but if not, we can estimate from barProps.y and barProps.height
                  // We'll use the bottom of the bar (barProps.y + barProps.height) as y0 (y-axis 0), and the top of the bar area as yMax
                  // The gold rect should start at y=barProps.y + barProps.height and end at y=barProps.y(0) of the tallest bar
                  // For a robust solution, use the chart's y=0 for axis 0, and y of the tallest bar for axis max
                  if (opt.key === 'totalActualEnrollment' && isSelected) {
                    // Estimate y0 (y-axis 0) and yMax (y-axis max) from barProps and chart height
                    // barProps.y is the top of the bar, barProps.height is the bar's height
                    // y0 = barProps.y + barProps.height (bottom of bar, y-axis 0)
                    // yMax = Math.min(barProps.y, 380) (top of chart area, y-axis max, fudge for margin)
                    const y0 = barProps.y + barProps.height;
                    const yMax = 20; // Chart margin top is 20, so y=20 is the top of the axis area
                    return (
                      <g>
                        <rect
                          x={barProps.x - 3}
                          y={yMax}
                          width={barProps.width + 6}
                          height={y0 - yMax}
                          fill="#FFF9E3" // pale gold interior
                          stroke="#FFD700"
                          strokeWidth={4}
                          rx={6}
                          ry={6}
                        />
                        <rect
                          x={barProps.x}
                          y={barProps.y}
                          width={barProps.width}
                          height={barProps.height}
                          fill={barProps.fill}
                        />
                      </g>
                    );
                  }
                  // Default bar
                  return (
                    <rect
                      x={barProps.x}
                      y={barProps.y}
                      width={barProps.width}
                      height={barProps.height}
                      fill={barProps.fill}
                    />
                  );
                }}
              />
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
