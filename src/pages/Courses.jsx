import React from 'react';
import useCourseData from '../hooks/useCourseData';
import CourseSelector from '../components/courses/CourseSelector';
import EnrollmentOverview from '../components/courses/EnrollmentOverview';
import CourseDetails from '../components/courses/CourseDetails';
import EnrollmentStats from '../components/courses/EnrollmentStats';
import { LoadingState, ErrorState } from '../components/courses/StatusStates';

const Courses = () => {
  const {
    courseNumbers,
    selectedCourse,
    setSelectedCourse,
    allCourses,
    courseDetails,
    enrollmentStats,
    loading,
    error
  } = useCourseData();

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>CMPS Courses - Spring 2025</h1>
      <p style={{ fontSize: '16px', marginBottom: '30px', color: '#666' }}>
        Explore Computer Science courses with enrollment data and statistics.
      </p>

      <CourseSelector 
        courseNumbers={courseNumbers}
        selectedCourse={selectedCourse}
        onCourseChange={handleCourseChange}
      />

      {loading && <LoadingState />}
      {error && <ErrorState error={error} />}

      {!loading && !error && (
        <>
          <EnrollmentOverview allCourses={allCourses} />
          <CourseDetails courseDetails={courseDetails} selectedCourse={selectedCourse} />
          <EnrollmentStats enrollmentStats={enrollmentStats} />
        </>
      )}
    </div>
  );
};

export default Courses;
