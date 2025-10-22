import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { processCourseData } from '../../utils/courseUtils';

const EnrollmentOverview = ({ allCourses }) => {
  if (!allCourses) return null;

  const filteredCourses = processCourseData(allCourses.courses);

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2>All CMPS Courses - Enrollment Overview</h2>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
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
            <Bar dataKey="totalActualEnrollment" fill="#3498db" name="Actual Enrollment" stackId="enroll" />
            <Bar dataKey="availableSeats" fill="#95a5a6" name="Available Seats" stackId="enroll" />
            <Bar dataKey="excessEnrollment" fill="#e74c3c" name="Excess Enrollment" stackId="enroll" />
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
