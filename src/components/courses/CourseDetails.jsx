import React from 'react';
import SectionEnrollmentChart from './SectionEnrollmentChart';

const CourseDetails = ({ courseDetails, selectedCourse }) => {
  if (!courseDetails) return null;

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2>Course Details - CMPS-{selectedCourse}</h2>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{courseDetails.name}</h3>
          <p style={{ margin: '5px 0', color: '#666' }}>
            <strong>Credit Hours:</strong> {courseDetails.creditHours}
          </p>
          <p style={{ margin: '5px 0', color: '#666' }}>
            <strong>Description:</strong> {courseDetails.description}
          </p>
          {courseDetails.prerequisites && courseDetails.prerequisites.length > 0 && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Prerequisites:</strong> {courseDetails.prerequisites.join(', ')}
            </p>
          )}
        </div>

        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Section Enrollment</h3>
        <SectionEnrollmentChart sections={courseDetails.sections} />

        <div style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>Sections ({courseDetails.sections.length})</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {courseDetails.sections.map((section, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '10px', 
                  marginBottom: '10px', 
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${section.actualEnrollment >= section.maxEnrollment ? '#e74c3c' : '#27ae60'}`
                }}
              >
                <strong>Section {section.section}</strong> - {section.instructor}
                <br />
                Enrollment: {section.actualEnrollment}/{section.maxEnrollment}
                {section.meetingDay1 && (
                  <span> | {section.meetingDay1} {section.day1BeginTime}-{section.day1EndTime}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
