import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Courses = () => {
  const [courseNumbers, setCourseNumbers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [allCourses, setAllCourses] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [enrollmentStats, setEnrollmentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Fetch course numbers list
  useEffect(() => {
    const fetchCourseNumbers = async () => {
      try {
        const response = await fetch('/api/courses/list');
        if (!response.ok) throw new Error('Failed to fetch course numbers');
        const data = await response.json();
        setCourseNumbers(data);
        if (data.length > 0) {
          setSelectedCourse(data[0]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseNumbers();
  }, []);

  // Fetch all data when component mounts or selectedCourse changes
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all courses
        const coursesResponse = await fetch('/api/courses');
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');
        const coursesData = await coursesResponse.json();
        setAllCourses(coursesData);

        // Fetch enrollment stats
        const statsResponse = await fetch('/api/courses/stats/enrollment');
        if (!statsResponse.ok) throw new Error('Failed to fetch enrollment stats');
        const statsData = await statsResponse.json();
        setEnrollmentStats(statsData);

        // Fetch specific course details if a course is selected
        if (selectedCourse) {
          const courseResponse = await fetch(`/api/courses/CMPS-${selectedCourse}`);
          if (!courseResponse.ok) throw new Error('Failed to fetch course details');
          const courseData = await courseResponse.json();
          setCourseDetails(courseData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>CMPS Courses - Spring 2025</h1>
      <p style={{ fontSize: '16px', marginBottom: '30px', color: '#666' }}>
        Explore Computer Science courses with enrollment data and statistics.
      </p>

      {/* Course Selector */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Select a Course</h2>
        <select
          value={selectedCourse}
          onChange={handleCourseChange}
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

      {!loading && !error && (
        <>
          {/* Visualization 1: All Courses Overview (/api/courses) */}
          {allCourses && (
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
                    data={allCourses.courses}
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
                    <Bar dataKey="totalActualEnrollment" fill="#3498db" name="Actual Enrollment" />
                    <Bar dataKey="totalMaxEnrollment" fill="#95a5a6" name="Max Enrollment" />
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '6px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Summary</h3>
                  <p style={{ margin: '5px 0' }}>Total Courses: {allCourses.courses.length}</p>
                  <p style={{ margin: '5px 0' }}>
                    Total Enrollment: {allCourses.courses.reduce((sum, c) => sum + c.totalActualEnrollment, 0)}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    Total Capacity: {allCourses.courses.reduce((sum, c) => sum + c.totalMaxEnrollment, 0)}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Visualization 2: Specific Course Details (/api/courses/:courseCode) */}
          {courseDetails && (
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
                {courseDetails.sections.length === 1 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Enrolled', value: courseDetails.sections[0].actualEnrollment, fill: COLORS[0] },
                          { name: 'Available', value: Math.max(courseDetails.sections[0].maxEnrollment - courseDetails.sections[0].actualEnrollment, 0), fill: COLORS[1] }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120}
                        dataKey="value"
                      >
                        <Cell key="cell-enrolled" fill={COLORS[0]} />
                        <Cell key="cell-available" fill={COLORS[1]} />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px',
                    marginBottom: '24px'
                  }}>
                    {courseDetails.sections.map((section, idx) => (
                      <div key={idx} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '16px' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '18px' }}>Section {section.section}</h4>
                        <ResponsiveContainer width="100%" height={220}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Enrolled', value: section.actualEnrollment, fill: COLORS[0] },
                                { name: 'Available', value: Math.max(section.maxEnrollment - section.actualEnrollment, 0), fill: COLORS[1] }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              dataKey="value"
                            >
                              <Cell key="cell-enrolled" fill={COLORS[0]} />
                              <Cell key="cell-available" fill={COLORS[1]} />
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ))}
                  </div>
                )}

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
          )}

          {/* Visualization 3: Enrollment Statistics (/api/courses/stats/enrollment) */}
          {enrollmentStats && (
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

              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center'
              }}>
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
