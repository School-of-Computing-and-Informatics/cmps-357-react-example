import React from 'react';

const CourseSelector = ({ courseNumbers, selectedCourse, onCourseChange }) => {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2>Select a Course</h2>
      <select
        value={selectedCourse}
        onChange={onCourseChange}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          border: '2px solid #3498db',
          borderRadius: '8px',
          backgroundColor: 'white',
          color: '#2c3e50',
          cursor: 'pointer',
          minWidth: '200px',
          outline: 'none'
        }}
      >
        {courseNumbers.map((num) => (
          <option key={num} value={num}>
            CMPS-{num}
          </option>
        ))}
      </select>
    </section>
  );
};

export default CourseSelector;
